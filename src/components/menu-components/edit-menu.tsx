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
import { useState, useTransition } from "react";

export default function EditMenu({
  title,
  menuItems
}: {
  title: string,
  menuItems: any,
}) {
  const [icon, setIcon] = useState(menuItems.icon);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Link href="/menu">
        <ShadButton>
          <RiArrowLeftCircleFill />
          Back
        </ShadButton>
      </Link>
      <form>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>{title}</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="icon-input">Icon:</FieldLabel>
                <Input name="icon" id="icon-input" disabled={pending} defaultValue={icon} />
              </Field>
              <Field>
                <FieldLabel htmlFor="text-input">Text:</FieldLabel>
                <Input
                  type="text"
                  name="text-input"
                  id="text-input"
                  disabled={pending}
                  defaultValue={text}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="link-input">Link:</FieldLabel>
                <Input
                  type="text"
                  name="link-input"
                  id="link-input"
                  disabled={pending}
                  defaultValue={link}
                />
              </Field>
            </FieldGroup>
            <ShadButton type="submit" disabled={pending}>
              {pending ? (
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
