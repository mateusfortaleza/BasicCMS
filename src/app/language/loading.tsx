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
      <Skeleton className="h-9 w-32 rounded-md" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10 rounded" />
            </TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={`language-table-skeleton-${index}`}>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 rounded" />
              </TableCell>
              <TableCell className="w-32">
                <div className="flex justify-center">
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </TableCell>
              <TableCell className="w-32">
                <div className="flex justify-center">
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
