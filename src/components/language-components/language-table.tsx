"use client";

import { startTransition, useState } from "react";
import { deletionLanguage } from "@/lib/actions";
import { Language } from "@/lib/definitions";
import DeleteButton from "@/components/delete-button";
import EditButton from "@/components/edit-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiArrowDownSFill, RiArrowUpSFill } from "@remixicon/react";

type SortState = "none" | "asc" | "desc";

export default function LanguageTable({
  languages,
}: {
  languages: Language[];
}) {
  const [sortState, setSortState] = useState<SortState>("none");

  const sortedLanguages =
    sortState === "none"
      ? languages
      : [...languages].sort((a, b) =>
          sortState === "desc"
            ? b.langCode.localeCompare(a.langCode)
            : a.langCode.localeCompare(b.langCode),
        );

  function toggleLangCodeSort() {
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
          <TableHead>Language</TableHead>
          <TableHead>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-medium"
              onClick={toggleLangCodeSort}
            >
              Code
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center">
                {sortState === "desc" && (
                  <RiArrowDownSFill aria-hidden="true" size={18} />
                )}
                {sortState === "asc" && (
                  <RiArrowUpSFill aria-hidden="true" size={18} />
                )}
              </span>
            </button>
          </TableHead>
          <TableHead />
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedLanguages.map((item) => (
          <TableRow key={`table-${item.id}`}>
            <TableCell>{item.language}</TableCell>
            <TableCell>{item.langCode}</TableCell>
            <TableCell className="w-32">
              <div className="flex justify-center">
                <EditButton
                  href={`/language/edit/${item.id}`}
                  ariaLabel={`Edit ${item.language}`}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <DeleteButton
                  typeOfElement="language"
                  clickFunction={() =>
                    startTransition(() => deletionLanguage(item.id))
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
