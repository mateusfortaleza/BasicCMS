"use client";

import { RiArrowLeftCircleFill } from "@remixicon/react";
import Link from "next/link";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Button as ShadButton } from "../ui/button";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { verifyAndUpdateMenuItem } from "@/lib/actions";
import { MenuItems } from "@/lib/definitions";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

const uppyRestrictions = {
  maxNumberOfFiles: 1,
  allowedFileTypes: ["image/svg+xml", ".svg"],
  maxFileSize: 1_000_000,
};

export default function EditMenu({
  title,
  menuItems,
}: {
  title: string;
  menuItems: MenuItems;
}) {
  const [text, setText] = useState(menuItems.menuText);
  const [link, setLink] = useState(menuItems.menuLink);
  const [uppy] = useState(() => new Uppy({ restrictions: uppyRestrictions }));
  const editMenuItemsWithId = verifyAndUpdateMenuItem.bind(null, menuItems.id);
  const [state, formAction, isPending] = useActionState(
    editMenuItemsWithId,
    null,
  );

  async function submitWithUppy(formData: FormData) {
    const uppyFile = uppy.getFiles()[0];

    if (uppyFile?.data instanceof File && uppyFile.data.size > 0) {
      formData.set("svg_url", uppyFile.data);
    }

    return formAction(formData);
  }

  useEffect(() => {
    if (!menuItems.svg_url || uppy.getFiles().length > 0) return;

    const fileName = menuItems.svg_url.split("/").pop() ?? "icon.svg";

    uppy.addFile({
      name: fileName,
      type: "image/svg+xml",
      data: new Blob([], { type: "image/svg+xml" }),
      preview: menuItems.svg_url,
      meta: { name: fileName },
    });
  }, [menuItems.svg_url, uppy]);

  return (
    <>
      <ShadButton data-icon="inline-start">
        <RiArrowLeftCircleFill />
        <Link href="/menu">Back</Link>
      </ShadButton>
      <form action={submitWithUppy}>
        <input type="hidden" name="svg_url" value={menuItems.svg_url} />
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>{title}</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel>SVG:</FieldLabel>
                <Dashboard
                  uppy={uppy}
                  height={300}
                  hideUploadButton
                  proudlyDisplayPoweredByUppy={false}
                  singleFileFullScreen={true}
                  disabled={isPending}
                  theme="dark"
                />
                {state?.errors?.svg_url && (
                  <p className="text-sm text-destructive">{state.errors.svg_url[0]}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="text-input">Text:</FieldLabel>
                <Input
                  type="text"
                  name="text-input"
                  id="text-input"
                  defaultValue={text}
                />
                {state?.errors?.menuText && (
                  <p className="text-sm text-destructive">
                    {state.errors.menuText[0]}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="link-input">Link:</FieldLabel>
                <Input
                  type="text"
                  name="link-input"
                  id="link-input"
                  defaultValue={link}
                />
                {state?.errors?.menuLink && (
                  <p className="text-sm text-destructive">
                    {state.errors.menuLink[0]}
                  </p>
                )}
              </Field>
            </FieldGroup>
            <ShadButton type="submit">
              {isPending ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </ShadButton>
          </FieldSet>
        </FieldGroup>
      </form>
    </>
  );
}
