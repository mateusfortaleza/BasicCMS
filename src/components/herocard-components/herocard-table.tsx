"use client";

import { startTransition, useState } from "react";
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
import { deletionHeroCard } from "../../lib/actions";
import { useLanguage } from "@/components/language-provider";

type HeroCard = {
  id: number;
  heroCardName: string;
}

type SortState = "none" | "asc" | "desc";

export default function HeroCardTable({ heroCards }: { heroCards: HeroCard[] }) {
  const [sortState, setSortState] = useState<SortState>("none");
  const { selectedLanguage } = useLanguage();

  const sortedHeroCards =
    sortState === "none"
      ? heroCards
      : [...heroCards].sort((a, b) =>
          sortState === "desc"
            ? b.heroCardName < a.heroCardName
              ? -1
              : b.heroCardName > a.heroCardName
                ? 1
                : 0
            : a.heroCardName < b.heroCardName
              ? -1
              : a.heroCardName > b.heroCardName
                ? 1
                : 0,
        );

  function toggleIdSort() {
    setSortState((current) => {
      if (current === "none") {
        return "desc";
      }

      if (current === "desc") {
        return "asc";
      }

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedHeroCards.map((item) => (
          <TableRow key={`table-${item.id}`}>
            <TableCell>
              {item.heroCardName}
            </TableCell>
            <TableCell className="w-32">
              <div className="flex justify-center">
                <Button asChild size="icon">
                  <Link
                    href={`/herocard/edit/${item.id}?lang_code=${selectedLanguage}`}
                    aria-label={`Edit ${item.heroCardName}`}
                  >
                    <RiPencilLine />
                  </Link>
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <DeleteButton typeOfElement="Hero Card" clickFunction={() => deletionHeroCard(item.id)}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
