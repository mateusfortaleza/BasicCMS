/**
 * Renders a static skeleton loading UI for the hero card edit route.
 *
 * Displays a set of animated placeholder bars and blocks (using utility classes such as `animate-pulse`, `bg-muted`, and layout utilities) to indicate loading state while the edit page content is being fetched.
 *
 * @returns A JSX element containing the skeleton placeholders for the loading state
 */
export default function Loading() {
  return (
    <>
      <div className="h-9 w-20 animate-pulse rounded bg-muted" />
      <div className="w-full m-auto flex justify-center items-center">
        <div className="w-2xl flex flex-col gap-4">
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-10 animate-pulse rounded bg-muted" />
              <div className="h-9 w-full animate-pulse rounded bg-muted" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-10 animate-pulse rounded bg-muted" />
              <div className="h-75 w-full animate-pulse rounded bg-muted" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-10 animate-pulse rounded bg-muted" />
              <div className="h-9 w-12 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-10 animate-pulse rounded bg-muted" />
              <div className="h-9 w-full animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="h-9 w-20 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </>
  );
}
