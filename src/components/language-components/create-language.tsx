"use client";

import { verifyAndInsertLanguage } from "@/lib/actions";
import { RiArrowLeftCircleFill } from "@remixicon/react";
import Link from "next/link";
import { useActionState } from "react";
import { Button as ShadButton } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function CreateLanguage({ title }: { title: string }) {
  const [state, formAction, isPending] = useActionState(
    verifyAndInsertLanguage,
    null,
  );

  return (
    <>
        <ShadButton data-icon="inline-start" asChild>
          <Link href="/language">
            <RiArrowLeftCircleFill />
            Back
          </Link>
        </ShadButton>

      <form action={formAction}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>{title}</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="language-input">Language:</FieldLabel>
                <Input
                  name="language-input"
                  id="language-input"
                  required
                  disabled={isPending}
                />
                {state?.errors?.languageName && (
                  <p className="text-sm text-destructive">
                    {state.errors.languageName[0]}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="lang-code-input">Language Code:</FieldLabel>
                <Input
                  name="lang-code-input"
                  id="lang-code-input"
                  required
                  maxLength={5}
                  disabled={isPending}
                />
                {state?.errors?.langCode && (
                  <p className="text-sm text-destructive">
                    {state.errors.langCode[0]}
                  </p>
                )}
              </Field>
            </FieldGroup>

            <ShadButton type="submit" disabled={isPending}>
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
