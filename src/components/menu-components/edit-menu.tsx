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
  useState,
  useTransition,
} from "react";
import { verifyAndUpdateMenuItem } from "@/lib/actions";
import { MenuItems } from "@/lib/definitions";

export default function EditMenu({
  title,
  menuItems,
}: {
  title: string;
  menuItems: MenuItems;
}) {
  const [icon, setIcon] = useState(menuItems.icon);
  const [text, setText] = useState(menuItems.menuText);
  const [link, setLink] = useState(menuItems.menuLink);
  const editMenuItemsWithId = verifyAndUpdateMenuItem.bind(null, menuItems.id);
  const [state, formAction, isPending] = useActionState(
    editMenuItemsWithId,
    null,
  );

  return (
    <>
      <ShadButton data-icon="inline-start">
        <RiArrowLeftCircleFill />
        <Link href="/menu">Back</Link>
      </ShadButton>
      <form action={formAction}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>{title}</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="icon-input">Icon:</FieldLabel>
                <Input name="icon" id="icon-input" defaultValue={icon} />
              </Field>
              <Field>
                <FieldLabel htmlFor="text-input">Text:</FieldLabel>
                <Input
                  type="text"
                  name="text-input"
                  id="text-input"
                  defaultValue={text}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="link-input">Link:</FieldLabel>
                <Input
                  type="text"
                  name="link-input"
                  id="link-input"
                  defaultValue={link}
                />
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
