"use client"

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiArrowDownSFill, RiArrowUpSFill, RiPencilLine } from "@remixicon/react";
import Image from "next/image"
import Link from "next/link";
import { Button } from "./ui/button";

type SortState = "none" | "asc" | "desc";

export default function MenuTable({menuItems}: {menuItems: any[]}) {
  const [sortState, setSortState] = useState<SortState>("none");

  const sortedMenuItems = 
      [...menuItems].sort((a, b) =>
        sortState === "desc" ? b.id - a.id : a.id - b.id,
      )

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
          <TableHead>Icon</TableHead>
          <TableHead>Text</TableHead>
          <TableHead className="text-left">Link</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMenuItems.map((item) => (
          <TableRow key={`table-${item.id}`}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Image 
                src={item.icon}
                width={16}
                height={16}
                alt={item.icon}
              />
              {/* {.length > 100
                ? item.icon.slice(0, 100) + "..."
                : item.icon} */}
            </TableCell>
             <TableCell className="text-left">{item.menuText}</TableCell>
             <TableCell className="text-left">{item.menuLink}</TableCell>
            <TableCell className="w-32">
              <div className="flex justify-center">
                <Button asChild size="icon">
                  <Link
                    href={`/menu/edit/${item.id}`}
                    aria-label={`Edit ${item.title_text}`}
                  >
                    <RiPencilLine />
                  </Link>
                </Button>
              </div>
            </TableCell>
            <TableCell />
          </TableRow> 
        ))}
      </TableBody>
    </Table>
  );
}
