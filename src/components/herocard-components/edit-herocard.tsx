"use client"

import { verifyAndUpdateHeroCard } from "@/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { Button as ShadButton } from "@/components/ui/button"
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RiArrowLeftCircleFill } from "@remixicon/react";
import Link from "next/link";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

export default function editHeroCardPage({title, heroCard}: {title: string, heroCard: any}) {
    const editHeroCardWithId = verifyAndUpdateHeroCard.bind(null, heroCard.id, heroCard.heroCardId);
    const [state, formAction, isPending] = useActionState(editHeroCardWithId, null);

    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
                maxFileSize: 10_000_000,
            },
        })
    );

    useEffect(() => {
        if (!heroCard.image_path || uppy.getFiles().length > 0) return;
        const fileName = heroCard.image_path.split("/").pop();

        uppy.addFile({
            name: fileName,
            type: "image/jpeg",
            data: new Blob([], { type: "image/jpeg" }),
            preview: heroCard.image_path,
            meta: { name: fileName }
        });
    }, [])

    return (
        <>      
        <Link href="/herocard"><ShadButton data-icon="inline-start"><RiArrowLeftCircleFill  />Back</ShadButton></Link>
        <form action={formAction}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title-input">Name:</FieldLabel>
                        <Input name="heroCard_name" id="heroCard-name" defaultValue={heroCard.heroCardName} disabled={isPending} />
                        {state?.errors?.heroCard_name && (
                            <p className="text-sm text-destructive">{state.errors.heroCard_name[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="title-input">Title:</FieldLabel>
                        <Input name="title_text" id="title-input" defaultValue={heroCard.title_text} disabled={isPending} />
                        {state?.errors?.title_text && (
                            <p className="text-sm text-destructive">{state.errors.title_text[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel>Image:</FieldLabel>
                        <Input type="hidden" name="image_path" value={heroCard.image_path} />
                        {state?.errors?.image_path && (
                            <p className="text-sm text-destructive">{state.errors.image_path[0]}</p>
                        )}
                        {state?.errors?.image_file && (
                            <p className="text-sm text-destructive">{state.errors.image_file[0]}</p>
                        )}
                        <Dashboard
                            uppy={uppy}
                            height={300}
                            hideUploadButton
                            proudlyDisplayPoweredByUppy={false}
                            singleFileFullScreen
                            disabled={isPending}
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Color:</FieldLabel>
                        <Input type="color" name="color" id="color-input" defaultValue={heroCard.color} disabled={isPending} />
                        {state?.errors?.color && (
                            <p className="text-sm text-destructive">{state.errors.color[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel>Link:</FieldLabel>
                        <Input type="text" name="link" id="link-input" defaultValue={heroCard.link} disabled={isPending} />
                        {state?.errors?.link && (
                            <p className="text-sm text-destructive">{state.errors.link[0]}</p>
                        )}
                    </Field>
                </FieldGroup>
                <ShadButton type="submit" disabled={isPending}>Submit</ShadButton>
            </FieldSet>
        </FieldGroup>
        </form>
        </>
    )
}
