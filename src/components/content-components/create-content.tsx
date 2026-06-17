"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { RiArrowLeftCircleFill } from "@remixicon/react";
import { verifyAndInsertContent } from "@/lib/actions";
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
import { ContentType, ContentTypeField } from "@/lib/definitions";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

const uppyRestrictions = {
  minNumberOfFiles: 1,
  maxNumberOfFiles: 1,
  allowedFileTypes: [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    ".svg",
  ],
  maxFileSize: 10_000_000,
};

export default function CreateContent({
  contentType,
  contentTypeFields,
}: {
  contentType: ContentType;
  contentTypeFields: ContentTypeField[];
}) {
  const [state, formAction, isPending] = useActionState(
    verifyAndInsertContent,
    null,
  );
  const [imageError, setImageError] = useState("");
  const [uppy] = useState(() => new Uppy({ restrictions: uppyRestrictions }));
  
  const imageFieldIndex = contentTypeFields.findIndex(
    (field) => field.fieldType === "image",
  );

  async function submitWithUppy(formData: FormData) {
    const uppyFile = uppy.getFiles()[0];
    const imageFile = uppyFile?.data instanceof File ? uppyFile.data : null;

    if (imageFieldIndex >= 0) {
      if (!imageFile) {
        setImageError("Image is required.");
        return;
      }

      setImageError("");

      const values = formData.getAll("content-field-value-input");
      values[imageFieldIndex] = imageFile;

      formData.delete("content-field-value-input");
      values.forEach((value) => {
        formData.append("content-field-value-input", value);
      });
    }

    return formAction(formData);
  }

  return (
    <>
      <Link href="/content">
        <ShadButton>
          <RiArrowLeftCircleFill />
          Back
        </ShadButton>
      </Link>

      <form action={submitWithUppy}>
        <input
          type="hidden"
          name="content-type-input"
          value={contentType.contentTypeId}
        />
        <FieldGroup className="w-full m-auto flex justify-center items-center">
          <FieldSet className="w-2xl flex justify-center">
            <FieldLegend>Create Content</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="content-name-input">Name:</FieldLabel>
                <Input
                  id="content-name-input"
                  name="content-name-input"
                  required
                  disabled={isPending}
                />
              </Field>

              <div className="flex w-full flex-col gap-6">
                <FieldLegend className="font-medium">Fields</FieldLegend>
                  {contentTypeFields.map((field) => (
                    <Field key={field.id}>
                      <input
                        type="hidden"
                        name="content-type-field-id-input"
                        value={field.id}
                      />
                      <FieldLabel htmlFor={`content-field-${field.id}`}>
                        {field.fieldName}:
                      </FieldLabel>
                      {field.fieldType === "image" ? (
                        <>
                          <input
                            type="hidden"
                            name="content-field-value-input"
                            value=""
                          />
                          <Dashboard
                            uppy={uppy}
                            height={300}
                            hideUploadButton
                            proudlyDisplayPoweredByUppy={false}
                            singleFileFullScreen
                            disabled={isPending}
                          />
                          {imageError && (
                            <p className="text-sm text-destructive">
                              {imageError}
                            </p>
                          )}
                        </>
                      ) : (
                        <Input
                          id={`content-field-${field.id}`}
                          name="content-field-value-input"
                          type={
                            field.fieldType === "datetime"
                              ? "datetime-local"
                              : field.fieldType
                          }
                          required
                          disabled={isPending}
                        />
                      )}
                    </Field>
                  ))}
              </div>
            </FieldGroup>

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
