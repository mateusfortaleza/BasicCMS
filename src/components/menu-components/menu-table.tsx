"use client";

import { startTransition, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiPencilLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
// import { Button } from "../ui/button";
import EditButton from "../edit-button";
import DeleteButton from "../delete-button";
import { deletionMenuItem } from "@/lib/actions";
import { MenuItems } from "@/lib/definitions";

type SortState = "none" | "asc" | "desc";

export default function MenuTable({ menuItems }: { menuItems: MenuItems[] }) {
  const [sortState, setSortState] = useState<SortState>("none");

  const sortedMenuItems =
    sortState === "none"
      ? menuItems
      : [...menuItems].sort((a, b) =>
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
              data-icon="inline-end"
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
              <Image src={item.icon} width={16} height={16} alt={item.icon} />
            </TableCell>
            <TableCell className="text-left">{item.menuText}</TableCell>
            <TableCell className="text-left">{item.menuLink}</TableCell>
            <TableCell className="w-32">
              <div className="flex justify-center">
                <EditButton
                  href={`/menu/edit/${item.id}`}
                  ariaLabel={`Edit ${item.menuText}`}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <DeleteButton
                  typeOfElement="menu item"
                  clickFunction={() => startTransition(() => deletionMenuItem(item.id))}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
