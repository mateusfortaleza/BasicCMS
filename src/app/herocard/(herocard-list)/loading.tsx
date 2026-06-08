import { Skeleton } from "@/components/ui/skeleton";
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
      <Skeleton className="ml-auto h-9 w-32 rounded-md" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={`table-skeleton-${index}`}>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
