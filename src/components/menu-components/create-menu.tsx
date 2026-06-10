"use client"

import { RiArrowLeftCircleFill } from "@remixicon/react"
import Link from "next/link"
import { FieldGroup, FieldSet, FieldLegend, Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Spinner } from "../ui/spinner"
import { Button as ShadButton } from "../ui/button"
import { useActionState, useState } from "react"
import { verifyAndInsertMenuItem } from "@/lib/actions"
import Uppy from "@uppy/core"
import Dashboard from "@uppy/react/dashboard"
import "@uppy/core/css/style.min.css"
import "@uppy/dashboard/css/style.min.css"

const uppyRestrictions = {
    maxNumberOfFiles: 1,
    allowedFileTypes: ["image/svg+xml", ".svg"],
    maxFileSize: 1_000_000,
};

export default function CreateMenu({title}: {title: string}) {
    const [state, formAction, isPending] = useActionState(verifyAndInsertMenuItem, null);
    const [uppy] = useState(() => new Uppy({ restrictions: uppyRestrictions }));

    async function submitWithUppy(formData: FormData) {
        const uppyFile = uppy.getFiles()[0];

        if (uppyFile?.data instanceof File) {
            formData.set("svg_url", uppyFile.data);
        }

        return formAction(formData);
    }

    return (
        <>
        <ShadButton><Link href="/menu"><RiArrowLeftCircleFill />Back</Link></ShadButton>
        <form action={submitWithUppy}>
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
                            singleFileFullScreen
                            disabled={isPending}
                            theme="dark"
                        />
                        {state?.errors?.svg_url && (
                            <p className="text-sm text-destructive">{state.errors.svg_url[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="text-input">Text:</FieldLabel>
                        <Input type="text" name="text-input" id="text-input" disabled={isPending} />
                        {state?.errors?.menuText && (
                            <p className="text-sm text-destructive">{state.errors.menuText[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="link-input">Link:</FieldLabel>
                        <Input type="text" name="link-input" id="link-input" disabled={isPending} />
                        {state?.errors?.menuLink && (
                            <p className="text-sm text-destructive">{state.errors.menuLink[0]}</p>
                        )}
                    </Field>
                </FieldGroup>
                <ShadButton type="submit" disabled={isPending}>{isPending ? <><Spinner data-icon="inline-start" />Submitting...</> : "Submit"}</ShadButton>
            </FieldSet>
        </FieldGroup>
        </form>
        </>
    )
}
