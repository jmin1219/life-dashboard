import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JSX } from "react";

interface WealthTableProps<T> {
  columns: {
    key: keyof T;
    label: string;
    render?: (row: T) => JSX.Element | string;
  }[];
  data: T[];
}

const WealthTable = <T,>({ columns, data }: WealthTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {column.render ? column.render(row) : String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default WealthTable;
