import { RiPencilLine } from "@remixicon/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function EditButton({
  href,
  ariaLabel,
}: {
  href: string;
  ariaLabel: string;
}) {
  return (
  <Button asChild size="icon">
    <Link href={href} aria-label={ariaLabel}>
      <RiPencilLine />
    </Link>
  </Button>
  )
}