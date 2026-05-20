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
      <Table>
        <colgroup>
          <col className="w-[171px]" />
          <col className="w-[1085px]" />
          <col className="w-[151px]" />
          <col className="w-[141px]" />
          <col className="w-32" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Title</TableHead>
            <TableHead>Image Path</TableHead>
            <TableHead>Color of the card</TableHead>
            <TableHead className="text-right">Link to the article</TableHead>
            <TableHead className="w-32 text-center" />
          </TableRow>
        </TableHeader>
        {Array.from({ length: 4 }).map((_, index) => (
          <TableBody key={`table-skeleton-${index}`}>
            <TableRow key={index}>
              <TableCell>
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-56 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="ml-auto h-4 w-48 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="w-32">
                <div className="flex justify-center">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
