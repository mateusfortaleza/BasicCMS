"use client"

import { RiArrowLeftCircleFill } from "@remixicon/react"
import Link from "next/link"
import { FieldGroup, FieldSet, FieldLegend, Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Spinner } from "../ui/spinner"
import { Button as ShadButton } from "../ui/button"
import { useTransition } from "react"
import { verifyAndInsertMenuItem } from "@/lib/actions"

export default function CreateMenu({title}: {title: string}) {
    const [pending, startTransition] = useTransition();

    function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget)

        startTransition(() => {
            void verifyAndInsertMenuItem(formData);
        })
    }

    return (
        <>
        <ShadButton><Link href="/menu"><RiArrowLeftCircleFill />Back</Link></ShadButton>
        <form onSubmit={onSubmit}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="icon-input">Icon:</FieldLabel>
                        <Input name="icon" id="icon-input" disabled={pending} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="text-input">Text:</FieldLabel>
                        <Input type="text" name="text-input" id="text-input" disabled={pending} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="link-input">Link:</FieldLabel>
                        <Input type="text" name="link-input" id="link-input" disabled={pending} />
                    </Field>
                </FieldGroup>
                <ShadButton type="submit" disabled={pending}>{pending ? <><Spinner data-icon="inline-start" />Submitting...</> : "Submit"}</ShadButton>
            </FieldSet>
        </FieldGroup>
        </form>
        </>
    )
}