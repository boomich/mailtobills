import { Skeleton } from "@mailtobills/ui/components/skeleton";
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

export function ExpenseDocumentsTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Table aria-busy="true" className="table-fixed max-md:table-auto">
          <ExpenseDocumentsTableColumns />
          <ExpenseDocumentsTableHeader
            labels={{
              number: "",
              received: "",
              sender: "",
              document: "",
              attachments: "",
            }}
          />
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow
                key={index}
                className="hover:bg-transparent max-md:grid max-md:grid-cols-[auto_1fr_auto] max-md:gap-x-3 max-md:px-5 max-md:py-4"
              >
                <TableCell className="py-4 pl-8 align-top max-md:row-span-2 max-md:px-0 max-md:py-0">
                  <Skeleton className="size-8" />
                </TableCell>
                <TableCell className="px-3 py-4 align-top max-md:col-start-2 max-md:row-start-2 max-md:px-0 max-md:py-0">
                  <div className="flex items-center gap-3">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-4 align-top max-md:col-start-2 max-md:row-start-3 max-md:px-0 max-md:py-0">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36 max-w-full" />
                    <Skeleton className="h-3 w-48 max-w-full" />
                  </div>
                </TableCell>
                <TableCell className="px-3 py-4 align-top max-md:col-span-3 max-md:col-start-1 max-md:row-start-1 max-md:mt-7 max-md:px-0 max-md:py-0">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[22rem] max-w-full" />
                    <Skeleton className="h-3 w-[18rem] max-w-full" />
                  </div>
                </TableCell>
                <TableCell className="px-3 py-4 text-right align-top max-md:col-start-3 max-md:row-start-3 max-md:px-0 max-md:py-0">
                  <Skeleton className="h-4 w-10" />
                </TableCell>
                <TableCell className="py-4 pr-8 text-right align-top max-md:col-start-3 max-md:row-span-2 max-md:row-start-1 max-md:px-0 max-md:py-0">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="size-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
}
