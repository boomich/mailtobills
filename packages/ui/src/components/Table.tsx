import * as React from "react";
import { cn } from "../lib/cn";

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

export const Table = ({ className, ...props }: TableProps) => (
  <table
    className={cn("min-w-full text-left text-sm", className)}
    {...props}
  />
);

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead
    className={cn(
      "border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500",
      className
    )}
    {...props}
  />
);

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody className={cn("divide-y divide-slate-100", className)} {...props} />
);

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr className={cn("text-sm", className)} {...props} />
);

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th className={cn("px-4 py-3", className)} {...props} />
);

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td className={cn("px-4 py-3", className)} {...props} />
);
