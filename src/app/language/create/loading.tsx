import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-9 w-20 rounded" />
      <div className="w-full m-auto flex justify-center items-center">
        <div className="w-2xl flex flex-col gap-4">
          <Skeleton className="h-6 w-36 rounded" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-9 w-full rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-9 w-24 rounded" />
            </div>
          </div>
          <Skeleton className="h-9 w-20 rounded" />
        </div>
      </div>
    </>
  );
}
