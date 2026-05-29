"use client";
import { RiDeleteBin2Fill, RiDeleteBinLine } from "@remixicon/react";
import { Button } from "../ui/button";
import { deletionHeroCard } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function HeroCardDeleteButton({ HeroCardId }: { HeroCardId: number }) {
    async function deletion(id: number) {
        await deletionHeroCard(id);
    }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" className="bg-red-500 hover:bg-red-800">
            <RiDeleteBinLine />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <RiDeleteBin2Fill color="rgba(171,0,0,1)" />
            </AlertDialogMedia>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the hero card permanentely
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => deletion(HeroCardId)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
