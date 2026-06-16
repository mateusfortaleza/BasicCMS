"use client";

import { useActionState } from "react";
import Link from "next/link";
import { RiArrowLeftCircleFill } from "@remixicon/react";
import { verifyAndUpdateContent } from "@/lib/actions";
import {
  Content,
  ContentField,
  ContentTypeField,
} from "@/lib/definitions";
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

export default function EditContent({
  contentItem,
  contentItemFields,
  contentTypeFields,
}: {
  contentItem: Content;
  contentItemFields: ContentField[];
  contentTypeFields: ContentTypeField[];
}) {
  const editContentWithId = verifyAndUpdateContent.bind(null, contentItem.id);

  const [state, formAction, isPending] = useActionState(
    editContentWithId,
    null,
  );

  const selectedFields = contentTypeFields.filter(
    (field) => field.contentTypeId === contentItem.contentTypeId,
  );

  const savedValues = new Map(
    contentItemFields.map((field) => [
      field.contentTypeFieldId,
      field.value,
    ]),
  );

  return (
    <>
      <Link href="/content">
        <ShadButton>
          <RiArrowLeftCircleFill />
          Back
        </ShadButton>
      </Link>

      <form action={formAction}>
        <input
          type="hidden"
          name="content-type-input"
          value={contentItem.contentTypeId}
        />
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>Edit Content</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="content-name-input">Name:</FieldLabel>
                <Input
                  id="content-name-input"
                  name="content-name-input"
                  defaultValue={contentItem.name}
                  required
                  disabled={isPending}
                />
              </Field>

            </FieldGroup>

            {selectedFields.length > 0 && (
              <>
                <FieldLegend>Fields</FieldLegend>

                <FieldGroup>
                  {selectedFields.map((field) => (
                    <Field key={field.id}>
                      <input
                        type="hidden"
                        name="content-type-field-id-input"
                        value={field.id}
                      />

                      <FieldLabel htmlFor={`content-field-${field.id}`}>
                        {field.fieldName}:
                      </FieldLabel>

                      <Input
                        key={field.id}
                        id={`content-field-${field.id}`}
                        name="content-field-value-input"
                        type={
                          field.fieldType === "datetime"
                            ? "datetime-local"
                            : field.fieldType === "image"
                              ? "file"
                            : field.fieldType
                        }
                        accept={field.fieldType === "image" ? "image/*" : undefined}
                        defaultValue={
                          field.fieldType === "image"
                            ? undefined
                            : savedValues.get(field.id) ?? ""
                        }
                        required
                        disabled={isPending}
                      />
                    </Field>
                  ))}
                </FieldGroup>
              </>
            )}

            {state?.errors?.values && (
              <p className="text-sm text-destructive">
                {state.errors.values[0]}
              </p>
            )}

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
