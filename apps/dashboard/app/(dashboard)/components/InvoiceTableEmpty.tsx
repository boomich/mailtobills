import { EmptyState } from "@mailtobills/ui";

export type InvoiceTableEmptyProps = {
  monthLabel: string;
  isLoading?: boolean;
};

export const InvoiceTableEmpty = ({
  monthLabel,
  isLoading,
}: InvoiceTableEmptyProps) => {
  if (isLoading) {
    return (
      <EmptyState
        title="Loading invoices"
        description="Syncing your latest uploads."
        className="shadow-none"
      />
    );
  }

  return (
    <EmptyState
      title={`No invoices in ${monthLabel}`}
      description="Forward a PDF to your MailToBills inbox to see it here."
      className="shadow-none"
    />
  );
};
