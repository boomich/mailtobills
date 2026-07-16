"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { MouseEventHandler } from "react";
import { Fragment, useState } from "react";

import type {
  ExpenseDocumentAttachment,
  ExpenseDocumentRow,
} from "@mailtobills/domain";
import type { Id } from "@mailtobills/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { FileText, Star } from "lucide-react";

import { api } from "@/lib/convexClient";
import {
  formatDocumentDate,
  formatFileSize as formatLocalizedFileSize,
} from "@/lib/localized-format";
import { Button } from "@mailtobills/ui/components/button";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@mailtobills/ui/components/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mailtobills/ui/components/table";
import {
  ExpenseDocumentsTableColumns,
  ExpenseDocumentsTableHeader,
} from "./expense-documents-table-chrome";
import { cn } from "@mailtobills/ui/lib/utils";

import { ExpenseDocumentDetailPanel } from "./expense-document-detail-panel";

const getSenderEmail = (document: ExpenseDocumentRow) =>
  document.originFromEmail ?? document.fromEmail;

const getSenderName = (document: ExpenseDocumentRow, unknownSender: string) => {
  const originName = document.originFromName?.trim();
  if (originName) return originName;

  const email = getSenderEmail(document);
  if (email?.includes("@")) {
    const domain = email.split("@")[1]?.split(".")[0];
    if (domain) return domain.charAt(0).toUpperCase() + domain.slice(1);
  }

  const fallback =
    document.subject?.trim() ||
    document.primaryAttachment?.originalFilename ||
    unknownSender;
  return fallback.length
    ? fallback.charAt(0).toUpperCase() + fallback.slice(1)
    : unknownSender;
};

function ViewPdfButton({
  attachment,
  label,
  onClick,
  children,
}: {
  attachment: ExpenseDocumentAttachment | undefined;
  label: string;
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const url = attachment?.downloadUrl ?? attachment?.fileUrl;

  if (!url) {
    return (
      <Button variant="outline" size="sm" disabled>
        <FileText className="size-3.5" />
        {children}
      </Button>
    );
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <FileText className="size-3.5" />
      {label}
    </Button>
  );
}

export function ExpenseDocumentsTable({
  documents,
  emptyLabel,
}: {
  documents: ExpenseDocumentRow[];
  emptyLabel: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("ExpenseDocuments.table");
  const fileSizeT = useTranslations("ExpenseDocuments.fileSize");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );
  const [selectedAttachmentId, setSelectedAttachmentId] = useState<
    string | null
  >(null);
  const [panelTrigger, setPanelTrigger] = useState<HTMLElement | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const setPrimaryAttachment = useMutation(
    api.expenseDocuments.setPrimaryAttachment,
  );
  const softDelete = useMutation(api.expenseDocuments.softDelete);

  const runAction = (
    id: string,
    action: () => Promise<unknown>,
    onSuccess?: () => void,
    failureMessage = t("errors.fallback"),
  ) => {
    setPendingId(id);
    setActionError(null);
    void action()
      .then(() => {
        onSuccess?.();
        router.refresh();
      })
      .catch((error: unknown) => {
        console.error("expense_document_action_failed", { id, error });
        setActionError(failureMessage);
      })
      .finally(() => setPendingId(null));
  };

  const selectedDocument = documents.find(
    (document) => document.id === selectedDocumentId,
  );
  const selectedDocumentIndex = selectedDocument
    ? documents.indexOf(selectedDocument)
    : -1;
  const selectedAttachment =
    selectedDocument?.attachments.find(
      (attachment) => attachment.id === selectedAttachmentId,
    ) ??
    selectedDocument?.primaryAttachment ??
    null;

  const selectDocument = (
    document: ExpenseDocumentRow,
    attachmentId = document.primaryAttachment?.id ?? null,
  ) => {
    setSelectedDocumentId(document.id);
    setSelectedAttachmentId(attachmentId);
    setActionError(null);
  };

  const openDocument = (
    document: ExpenseDocumentRow,
    trigger: HTMLElement,
    attachmentId?: string,
  ) => {
    selectDocument(document, attachmentId);
    setPanelTrigger(trigger);
    setActionError(null);
    setPanelOpen(true);
  };

  const selectDocumentAt = (index: number) => {
    const document = documents[index];
    if (document) selectDocument(document);
  };

  const deleteSelectedDocument = () => {
    if (!selectedDocument) return;

    const nextDocument =
      documents[selectedDocumentIndex + 1] ??
      documents[selectedDocumentIndex - 1];

    runAction(
      selectedDocument.id,
      () =>
        softDelete({
          expenseDocumentId: selectedDocument.id as Id<"expenseDocuments">,
        }),
      () => {
        if (nextDocument) {
          selectDocument(nextDocument);
        } else {
          setPanelOpen(false);
        }
      },
      t("errors.delete"),
    );
  };

  if (documents.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon>
          <FileText />
        </EmptyStateIcon>
        <EmptyStateTitle>{t("emptyTitle")}</EmptyStateTitle>
        <EmptyStateDescription>{emptyLabel}</EmptyStateDescription>
      </EmptyState>
    );
  }

  // Newest on top (approved lab composition); Nº counts from the month's
  // first document, so the top row carries the highest number.
  const manifestDocuments = documents;
  const totalCount = documents.length;

  return (
    <div className="min-w-0">
      {actionError && !panelOpen ? (
        <div
          role="alert"
          className="border-b border-destructive bg-destructive/10 px-5 py-2 text-sm text-destructive sm:px-8"
        >
          {actionError}
        </div>
      ) : null}
      <Table className="table-fixed max-md:table-auto">
          <ExpenseDocumentsTableColumns />
          <ExpenseDocumentsTableHeader
            labels={{
              number: t("headers.number"),
              received: t("headers.received"),
              sender: t("headers.sender"),
              document: t("headers.document"),
              attachments: t("headers.attachments"),
            }}
          />
          <TableBody>
            {manifestDocuments.map((document, index) => {
              const sender = getSenderName(document, t("unknownSender"));
              const primary = document.primaryAttachment;
              const isExpanded = expandedId === document.id;
              const isBusy =
                pendingId === document.id ||
                document.attachments.some(
                  (attachment) => attachment.id === pendingId,
                );

              return (
                <Fragment key={document.id}>
                  <TableRow
                    data-state={isExpanded ? "selected" : undefined}
                    aria-selected={panelOpen && selectedDocumentId === document.id}
                    tabIndex={0}
                    className={cn(
                      "group cursor-pointer focus-visible:ring-ring/50 outline-none focus-visible:ring-2 focus-visible:ring-inset max-md:grid max-md:grid-cols-[auto_1fr_auto] max-md:gap-x-3 max-md:px-5 max-md:py-4",
                      isExpanded && "border-b-0",
                      panelOpen &&
                        selectedDocumentId === document.id &&
                        "bg-secondary/60",
                    )}
                    onClick={(event) =>
                      openDocument(document, event.currentTarget)
                    }
                    onKeyDown={(event) => {
                      if (event.target !== event.currentTarget) return;
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      openDocument(document, event.currentTarget);
                    }}
                  >
                    <TableCell className="py-4 pl-8 align-top font-mono text-[12px] font-bold text-stamp max-md:row-span-2 max-md:px-0 max-md:py-0">
                      {String(totalCount - index).padStart(3, "0")}
                    </TableCell>
                    <TableCell className="px-3 py-4 align-top font-mono text-[12px] whitespace-nowrap text-muted-foreground max-md:col-start-2 max-md:row-start-2 max-md:px-0 max-md:py-0 max-md:text-[11px]">
                      {formatDocumentDate(document.receivedAt, locale)}
                    </TableCell>
                    <TableCell className="px-3 py-4 align-top max-md:col-start-2 max-md:row-start-3 max-md:px-0 max-md:py-0">
                      <div className="text-[14px] leading-tight font-semibold">{sender}</div>
                      <div
                        className="mt-1 truncate font-mono text-[11px] text-muted-foreground"
                        title={
                          document.originFromEmail && document.fromEmail
                            ? t("forwardedBy", { email: document.fromEmail })
                            : undefined
                        }
                      >
                        {getSenderEmail(document) ?? t("forwardedEmail")}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4 align-top max-md:col-span-3 max-md:col-start-1 max-md:row-start-1 max-md:mt-7 max-md:px-0 max-md:py-0">
                      <div className="font-mono text-[12.5px] leading-tight font-bold break-all">
                        {primary?.originalFilename ?? t("noPrimaryPdf")}
                      </div>
                      <div className="mt-1 truncate text-[12px] text-muted-foreground">
                        {document.subject ?? t("noSubject")}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4 text-right align-top font-mono text-[12px] text-muted-foreground max-md:col-start-3 max-md:row-start-3 max-md:px-0 max-md:py-0">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setExpandedId(isExpanded ? null : document.id);
                        }}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? t("collapseAttachments") : t("expandAttachments")}
                        className="font-mono text-[12px] text-muted-foreground underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {document.attachments.length}
                      </button>
                    </TableCell>
                    <TableCell className="py-4 pr-8 text-right align-top max-md:col-start-3 max-md:row-span-2 max-md:row-start-1 max-md:px-0 max-md:py-0">
                      <span aria-hidden className="inline-block font-mono text-[13px] text-muted-foreground transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:group-hover:translate-0">→</span>
                    </TableCell>
                  </TableRow>
                  {isExpanded ? (
                    <TableRow
                      key={`${document.id}-attachments`}
                      className="hover:bg-transparent"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <TableCell colSpan={6} className="bg-secondary/60 px-5 py-3 sm:px-8">
                        <div className="space-y-2 sm:pl-[52px]">
                          {document.attachments.map((attachment) => {
                            const isPrimary = attachment.id === primary?.id;
                            const fileSize = formatLocalizedFileSize(
                              attachment.fileSize,
                              locale,
                              {
                                kb: (size) => fileSizeT("kb", { size }),
                                mb: (size) => fileSizeT("mb", { size }),
                              },
                            );

                            return (
                              <div
                                key={attachment.id}
                                className={cn(
                                  "border border-foreground/25 bg-background flex flex-col gap-3 px-3 py-2 transition-colors sm:flex-row sm:items-center sm:justify-between",
                                  isPrimary &&
                                    "border-stamp/35 bg-stamp/5",
                                )}
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <div
                                    className={cn(
                                      "bg-secondary flex size-8 shrink-0 items-center justify-center border border-foreground/25",
                                      isPrimary &&
                                        "border-stamp/35 bg-stamp/10 text-stamp",
                                    )}
                                  >
                                    {isPrimary ? (
                                      <Star className="size-4" />
                                    ) : (
                                      <FileText className="text-muted-foreground size-4" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="truncate font-medium">
                                      {attachment.originalFilename}
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                      {isPrimary ? t("primaryPdf") : t("pdf")}
                                      {fileSize ? ` - ${fileSize}` : ""}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                                  {!isPrimary ? (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      disabled={isBusy}
                                      onClick={() =>
                                        runAction(attachment.id, () =>
                                          setPrimaryAttachment({
                                            expenseDocumentId:
                                              document.id as Id<"expenseDocuments">,
                                            attachmentId:
                                              attachment.id as Id<"expenseDocumentAttachments">,
                                          }),
                                        )
                                      }
                                    >
                                      {t("makePrimary")}
                                    </Button>
                                  ) : null}
                                  <ViewPdfButton
                                    attachment={attachment}
                                    label={t("open")}
                                    onClick={(event) =>
                                      openDocument(
                                        document,
                                        event.currentTarget,
                                        attachment.id,
                                      )
                                    }
                                  >
                                    {t("open")}
                                  </ViewPdfButton>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      <ExpenseDocumentDetailPanel
        open={panelOpen}
        document={selectedDocument ?? null}
        selectedAttachment={selectedAttachment}
        documentIndex={Math.max(selectedDocumentIndex, 0)}
        documentCount={documents.length}
        isBusy={pendingId !== null}
        errorMessage={actionError}
        returnFocusTo={panelTrigger}
        onOpenChange={(open) => {
          if (!open && pendingId !== null) return;
          setPanelOpen(open);
        }}
        onPrevious={() => selectDocumentAt(selectedDocumentIndex - 1)}
        onNext={() => selectDocumentAt(selectedDocumentIndex + 1)}
        onSelectAttachment={setSelectedAttachmentId}
        onMakePrimary={(attachmentId) => {
          if (!selectedDocument) return;
          runAction(
            attachmentId,
            () =>
              setPrimaryAttachment({
                expenseDocumentId:
                  selectedDocument.id as Id<"expenseDocuments">,
                attachmentId: attachmentId as Id<"expenseDocumentAttachments">,
            }),
            undefined,
            t("errors.primary"),
          );
        }}
        onDelete={deleteSelectedDocument}
      />
    </div>
  );
}
