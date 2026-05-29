"use client"
import { verifyAndCreateHeroCard } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Button as ShadButton } from "@/components/ui/button"
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RiArrowLeftCircleFill } from "@remixicon/react";
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

const uppyRestrictions = {
    maxNumberOfFiles: 1,
    allowedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
    maxFileSize: 10_000_000,
}

export default function CreatePage({title}: {title: string}) {
    const [pending, startTransition] = useTransition();
    const [uppy] = useState(() => new Uppy({restrictions: uppyRestrictions}));

    function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const uppyFile = uppy.getFiles()[0];
        if (!uppyFile?.data) {
            return;
        }
        if (uppyFile?.data instanceof File) {
            formData.set("image_file", uppyFile.data)
        }

        uppy.clear();
        startTransition(() => {
            void verifyAndCreateHeroCard(formData);
        })
    }

    return (
        <>      
        <Link href="/herocard"><ShadButton><RiArrowLeftCircleFill />Back</ShadButton></Link>
        <form onSubmit={onSubmit}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title-input">Title:</FieldLabel>
                        <Input name="title_text" id="title-input" required disabled={pending} />
                    </Field>
                    <Field>
                        <FieldLabel>Image:</FieldLabel>
                        <Dashboard
                            uppy={uppy}
                            height={300}
                            hideUploadButton
                            proudlyDisplayPoweredByUppy={false}
                            singleFileFullScreen
                            disabled={pending}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="color-input">Color:</FieldLabel>
                        <Input type="color" name="color" id="color-input" required defaultValue="#ffffff" disabled={pending}  />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="link-input">Link:</FieldLabel>
                        <Input type="text" name="link" id="link-input" required disabled={pending} />
                    </Field>
                </FieldGroup>
                <ShadButton type="submit" disabled={pending}>{pending ? <><Spinner data-icon="inline-start" />Submitting...</> : "Submit"}</ShadButton>
            </FieldSet>
        </FieldGroup>
        </form>
        </>
    )
}