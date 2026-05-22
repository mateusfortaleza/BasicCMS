import { cn } from "@/lib/utils"
import { RiLoaderLine } from "@remixicon/react"

/**
 * Renders a spinning loader icon with sensible defaults for size and accessibility.
 *
 * @param className - Additional CSS classes to merge with the default "size-4 animate-spin"
 * @param props - Additional props forwarded to the underlying `RiLoaderLine` icon
 * @returns The `RiLoaderLine` element configured as an accessible spinning loader (`role="status"`, `aria-label="Loading"`)
 */
function Spinner({ className, ...props }: React.ComponentProps<typeof RiLoaderLine>) {
  return (
    <RiLoaderLine role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
