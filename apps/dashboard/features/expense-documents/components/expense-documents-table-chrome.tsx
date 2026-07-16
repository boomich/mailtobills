import {
  TableHead,
  TableHeader,
  TableRow,
} from "@mailtobills/ui/components/table";
export function ExpenseDocumentsTableColumns() {
  return (
    <colgroup>
      <col className="w-[64px]" />
      <col className="w-[112px]" />
      <col />
      <col />
      <col className="w-[96px]" />
      <col className="w-[48px]" />
    </colgroup>
  );
}

export function ExpenseDocumentsTableHeader({
  labels,
}: {
  labels: {
    number: string;
    received: string;
    sender: string;
    document: string;
    attachments: string;
  };
}) {

  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="py-3 pl-8 max-md:hidden">{labels.number}</TableHead>
        <TableHead className="px-3 py-3 max-md:hidden">{labels.received}</TableHead>
        <TableHead className="px-3 py-3 max-md:hidden">{labels.sender}</TableHead>
        <TableHead className="px-3 py-3 max-md:hidden">{labels.document}</TableHead>
        <TableHead className="px-3 py-3 text-right max-md:hidden">{labels.attachments}</TableHead>
        <TableHead className="w-12 py-3 pr-8 max-md:hidden"><span className="sr-only">{labels.document}</span></TableHead>
      </TableRow>
    </TableHeader>
  );
}
