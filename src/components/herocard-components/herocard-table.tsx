"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowDownSFill, RiArrowUpSFill, RiPencilLine } from "@remixicon/react";
import HeroCardDeleteButton from "@/components/herocard-components/herocard-delete-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type HeroCard = {
  id: number;
  image_path: string;
  title_text: string;
  color: string;
  link: string;
};

type SortState = "none" | "asc" | "desc";

export default function HeroCardTable({ heroCards }: { heroCards: HeroCard[] }) {
  const [sortState, setSortState] = useState<SortState>("none");

  const sortedHeroCards = [...heroCards].sort((a, b) =>
    sortState === "desc" ? b.id - a.id : a.id - b.id,
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
              Id
              {sortState === "desc" && (
                <RiArrowDownSFill aria-hidden="true" size={18} />
              )}
              {sortState === "asc" && (
                <RiArrowUpSFill aria-hidden="true" size={18} />
              )}
            </button>
          </TableHead>
          <TableHead className="w-25">Title</TableHead>
          <TableHead>Image Path</TableHead>
          <TableHead>Color of the card</TableHead>
          <TableHead className="text-left">Link to the article</TableHead>
          <TableHead className="w-32 text-center" />
          <TableHead className="w-32 text-center" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedHeroCards.map((item) => (
          <TableRow key={`table-${item.id}`}>
            <TableCell>{item.id}</TableCell>
            <TableCell className="font-medium">{item.title_text}</TableCell>
            <TableCell>
              {item.image_path.length > 100
                ? item.image_path.slice(0, 100) + "..."
                : item.image_path}
            </TableCell>
            <TableCell>{item.color}</TableCell>
            <TableCell className="text-left">{item.link}</TableCell>
            <TableCell className="w-32">
              <div className="flex justify-center">
                <Button asChild size="icon">
                  <Link
                    href={`/herocard/edit/${item.id}`}
                    aria-label={`Edit ${item.title_text}`}
                  >
                    <RiPencilLine />
                  </Link>
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <HeroCardDeleteButton HeroCardId={item.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
