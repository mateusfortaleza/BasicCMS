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
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RiAddLargeFill,
  RiArrowLeftCircleFill,
  RiCloseLine,
} from "@remixicon/react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const toSnakeCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+/, "")
    .toLowerCase();

export default function CreateContentType({ title }: { title: string }) {
  const [fields, setFields] = useState([crypto.randomUUID()]);
  const [contentTypeName, setContentTypeName] = useState("");
  const [state, formAction, isPending] = useActionState(
    verifyAndInsertContentType,
    null,
  );
  const snakeCaseName = toSnakeCase(contentTypeName);
  const submittedSnakeCaseName = snakeCaseName.replace(/_+$/, "");

  function submitContentType(formData: FormData) {
    formData.set("content-type-id-input", submittedSnakeCaseName);
    return formAction(formData);
  }

  function addField() {
    setFields((current) => [...current, crypto.randomUUID()]);
  }

  function removeField(fieldId: string) {
    setFields((current) => current.filter((id) => id !== fieldId));
  }

  return (
    <>
      <Link href="/content-type">
        <ShadButton>
          <RiArrowLeftCircleFill />
          Back
        </ShadButton>
      </Link>

      <form action={submitContentType}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend className="text-center">{title}</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="content-type-name-input">
                  Name:<FieldDescription>(required)</FieldDescription>
                </FieldLabel>
                <Input
                  name="content-type-name-input"
                  id="content-type-name-input"
                  value={contentTypeName}
                  onChange={(event) => setContentTypeName(event.target.value)}
                  required
                  disabled={isPending}
                />
                {state?.errors?.contentTypeName && (
                  <p className="text-sm text-destructive">
                    {state.errors.contentTypeName[0]}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="content-type-snake-case-input">
                  Type Identifier:
                </FieldLabel>
                <Input
                  id="content-type-snake-case-input"
                  value={snakeCaseName}
                  disabled
                />
                <input
                  type="hidden"
                  name="content-type-id-input"
                  value={snakeCaseName}
                />
              </Field>
            </FieldGroup>

            <FieldLegend>Fields</FieldLegend>
            <FieldGroup>
              {fields.map((fieldId, index) => (
                <div key={fieldId} className="relative">
                  <FieldGroup className="flex-1">
                    <div className="flex gap-4">
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
                            <SelectItem value="image">Image</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  </FieldGroup>
                  {index > 0 && (
                    <ShadButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute -right-12 bottom-0"
                      aria-label={`Remove field ${index + 1}`}
                      onClick={() => removeField(fieldId)}
                      disabled={isPending}
                    >
                      <RiCloseLine color="rgba(255,0,0,1)" />
                    </ShadButton>
                  )}
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
