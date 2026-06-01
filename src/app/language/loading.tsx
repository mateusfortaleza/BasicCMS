import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead>
              <div className="h-4 w-10 animate-pulse rounded bg-muted" />
            </TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={`language-table-skeleton-${index}`}>
              <TableCell>
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="w-32">
                <div className="flex justify-center">
                  <div className="h-9 w-9 animate-pulse rounded-md bg-muted" />
                </div>
              </TableCell>
              <TableCell className="w-32">
                <div className="flex justify-center">
                  <div className="h-9 w-9 animate-pulse rounded-md bg-muted" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
