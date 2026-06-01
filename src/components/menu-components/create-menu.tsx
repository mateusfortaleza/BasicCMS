"use client"

import { RiArrowLeftCircleFill } from "@remixicon/react"
import Link from "next/link"
import { FieldGroup, FieldSet, FieldLegend, Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Spinner } from "../ui/spinner"
import { Button as ShadButton } from "../ui/button"
import { useActionState } from "react"
import { verifyAndInsertMenuItem } from "@/lib/actions"

export default function CreateMenu({title}: {title: string}) {
    const [state, formAction, isPending] = useActionState(verifyAndInsertMenuItem, null);

    return (
        <>
        <ShadButton><Link href="/menu"><RiArrowLeftCircleFill />Back</Link></ShadButton>
        <form action={formAction}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="icon-input">Icon:</FieldLabel>
                        <Input name="icon" id="icon-input" disabled={isPending} />
                        {state?.errors?.icon && (
                            <p className="text-sm text-destructive">{state.errors.icon[0]}</p>
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
