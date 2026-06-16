"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiAddLargeFill } from "@remixicon/react";
import { ContentType } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectContentTypeDialog({
  contentTypes,
}: {
  contentTypes: ContentType[];
}) {
  const router = useRouter();
  const [selectedContentType, setSelectedContentType] = useState("");

  function continueToCreate() {
    if (!selectedContentType) return;

    router.push(`/content/create?contentTypeId=${selectedContentType}`);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-370" type="button" data-icon="inline-end">
          <RiAddLargeFill color="rgba(255,255,255,1)" />
          Create New
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select Content Type</AlertDialogTitle>
          <AlertDialogDescription>
            Select the Content Type used by the new Content.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Select
          value={selectedContentType}
          onValueChange={setSelectedContentType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent position="popper">
            {contentTypes.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.contentTypeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!selectedContentType}
            onClick={continueToCreate}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
