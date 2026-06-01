export default function Loading() {
  return (
    <>
      <div className="h-9 w-20 animate-pulse rounded bg-muted" />
      <div className="w-full m-auto flex justify-center items-center">
        <div className="w-2xl flex flex-col gap-4">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-9 w-full animate-pulse rounded bg-muted" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-9 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="h-9 w-20 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </>
  );
}
