"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowDownSFill, RiArrowUpSFill, RiPencilLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "../delete-button";
import { deletionContentType } from "../../lib/actions";
import { ContentType } from "@/lib/definitions";

type SortState = "none" | "asc" | "desc";

export default function ContentTypeTable({
  contentTypes,
}: {
  contentTypes: ContentType[];
}) {
  const [sortState, setSortState] = useState<SortState>("none");

  const sortedContentTypes =
    sortState === "none"
      ? contentTypes
      : [...contentTypes].sort((a, b) =>
          sortState === "desc"
            ? b.contentTypeName < a.contentTypeName
              ? -1
              : b.contentTypeName > a.contentTypeName
                ? 1
                : 0
            : a.contentTypeName < b.contentTypeName
              ? -1
              : a.contentTypeName > b.contentTypeName
                ? 1
                : 0,
        );

  function toggleIdSort() {
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
              onClick={toggleIdSort}
            >
              Name
              {sortState === "desc" && (
                <RiArrowDownSFill aria-hidden="true" size={18} />
              )}
              {sortState === "asc" && (
                <RiArrowUpSFill aria-hidden="true" size={18} />
              )}
            </button>
          </TableHead>
          <TableHead>Type Identifier</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedContentTypes.map((item) => (
          <TableRow key={`table-${item.id}`}>
            <TableCell>{item.contentTypeName}</TableCell>
            <TableCell>{item.contentTypeId}</TableCell>
            <TableCell className="w-32">
              <div className="flex justify-center">
                <Button asChild size="icon">
                  <Link
                    href={`/content-type/edit/${item.id}`}
                    aria-label={`Edit ${item.contentTypeName}`}
                  >
                    <RiPencilLine />
                  </Link>
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <DeleteButton
                  typeOfElement="Content Type"
                  clickFunction={() => deletionContentType(item.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
