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
      <div className="ml-370 h-9 w-32 animate-pulse rounded-md bg-muted" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Title</TableHead>
            <TableHead>Image Path</TableHead>
            <TableHead>Color of the card</TableHead>
            <TableHead className="text-left">Link to the article</TableHead>
            <TableHead className="w-32 text-center" />
            <TableHead className="w-32 text-center" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={`table-skeleton-${index}`}>
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
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
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
