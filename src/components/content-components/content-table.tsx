"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiPencilLine,
} from "@remixicon/react";
import { deletionContent } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/delete-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ContentListItem = {
  id: number;
  name: string;
  contentTypeId: string;
  contentTypeName: string;
};

type SortState = "none" | "asc" | "desc";

export default function ContentTable({
  contentItems,
}: {
  contentItems: ContentListItem[];
}) {
  const [sortState, setSortState] = useState<SortState>("none");

  const sortedContent =
    sortState === "none"
      ? contentItems
      : [...contentItems].sort((a, b) =>
          sortState === "desc"
            ? b.name < a.name
              ? -1
              : b.name > a.name
                ? 1
                : 0
            : a.name < b.name
              ? -1
              : a.name > b.name
                ? 1
                : 0,
        );

  function toggleNameSort() {
    setSortState((current) => {
      if (current === "none") return "desc";
      if (current === "desc") return "asc";
      return "none";
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-medium"
              onClick={toggleNameSort}
            >
              Name
              {sortState === "desc" && <RiArrowDownSFill size={18} />}
              {sortState === "asc" && <RiArrowUpSFill size={18} />}
            </button>
          </TableHead>
          <TableHead>Content Type</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedContent.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.contentTypeName}</TableCell>
            <TableCell className="w-32">
              <Button asChild size="icon">
                <Link
                  href={`/content/edit/${item.id}`}
                  aria-label={`Edit ${item.name}`}
                >
                  <RiPencilLine />
                </Link>
              </Button>
            </TableCell>
            <TableCell>
              <DeleteButton
                typeOfElement="Content"
                clickFunction={() => deletionContent(item.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
