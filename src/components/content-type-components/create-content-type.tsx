"use client";

import { verifyAndInsertContentType } from "@/lib/actions";
import { useActionState, useState } from "react";
import { Button as ShadButton } from "@/components/ui/button";
import {
  FieldSet,
  Field,
  FieldLabel,
  FieldGroup,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiAddLargeFill, RiArrowLeftCircleFill } from "@remixicon/react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function CreateContentType({ title }: { title: string }) {
  const [fields, setFields] = useState([crypto.randomUUID()]);
  const [state, formAction, isPending] = useActionState(
    verifyAndInsertContentType,
    null,
  );

  function addField() {
    setFields((current) => [...current, crypto.randomUUID()]);
  }

  return (
    <>
      <Link href="/content-type">
        <ShadButton>
          <RiArrowLeftCircleFill />
          Back
        </ShadButton>
      </Link>

      <form action={formAction}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>{title}</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="content-type-name-input">
                  Name:
                </FieldLabel>
                <Input
                  name="content-type-name-input"
                  id="content-type-name-input"
                  required
                  disabled={isPending}
                />
                {state?.errors?.contentTypeName && (
                  <p className="text-sm text-destructive">
                    {state.errors.contentTypeName[0]}
                  </p>
                )}
              </Field>
            </FieldGroup>

            <FieldLegend>Fields</FieldLegend>
            <FieldGroup>
              {fields.map((fieldId, index) => (
                <div key={fieldId} className="flex gap-4">
                  <Field className="flex-1">
                    <FieldLabel htmlFor={`field-name-input-${index}`}>
                      Name:
                    </FieldLabel>
                    <Input
                      name="field-name-input"
                      id={`field-name-input-${index}`}
                      required
                      disabled={isPending}
                    />
                  </Field>
                  <Field className="flex-1">
                    <FieldLabel htmlFor={`field-type-input-${index}`}>
                      Type:
                    </FieldLabel>
                    <Select
                      name="field-type-input"
                      required
                      disabled={isPending}
                    >
                      <SelectTrigger
                        id={`field-type-input-${index}`}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select field type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="datetime">Datetime</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              ))}
              {state?.errors?.fieldNames && (
                <p className="text-sm text-destructive">
                  {state.errors.fieldNames[0]}
                </p>
              )}
            </FieldGroup>

            <ShadButton
              type="button"
              size="sm"
              className="self-end"
              onClick={addField}
              disabled={isPending}
            >
              <RiAddLargeFill />
              Add Field
            </ShadButton>

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
