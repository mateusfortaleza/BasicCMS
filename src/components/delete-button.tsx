"use client"
import { RiDeleteBinLine, RiDeleteBin2Fill } from "@remixicon/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { startTransition } from "react";

export default function DeleteButton({typeOfElement, clickFunction}: {typeOfElement: string, clickFunction: any}) {
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
              This will delete the {typeOfElement} permanently
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={clickFunction}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
