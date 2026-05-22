"use client"
import { verifyAndUpdateHeroCard } from "@/lib/actions";
import { ChangeEvent, use, useEffect, useState } from "react";
import { Button as ShadButton } from "@/components/ui/button"
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RiArrowLeftCircleFill } from "@remixicon/react";
import Link from "next/link";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";


/**
 * Render an edit form for a hero card including title, image uploader, color, and link inputs.
 *
 * The form is pre-populated from `heroCard`, binds a server action using `heroCard.id` as its `action`,
 * and initializes an Uppy dashboard that will preload the existing `heroCard.image_path` when present.
 *
 * @param title - Heading shown in the form legend
 * @param heroCard - The hero card being edited; expected shape includes `id`, `title_text`, `color`, `link`, and `image_path`
 * @returns The JSX element for the edit page containing the controlled inputs and Uppy Dashboard
 */
export default function editPage({title, heroCard}: {title: string, heroCard: any}) {
    const [titleInput, setTitleInput] = useState(heroCard.title_text);
    const [colorInput, setColorInput] = useState(heroCard.color);
    const [linkInput, setLinkInput] = useState(heroCard.link)
    const editHeroCardWithId = verifyAndUpdateHeroCard.bind(null, heroCard.id);

    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
                maxFileSize: 10_000_000,
            },
        })
    );
    
    function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitleInput(event.target.value);
    }
    function onColorChange(event: ChangeEvent<HTMLInputElement>) {
        setColorInput(event.target.value)
    }
    function onLinkChange(event: ChangeEvent<HTMLInputElement>) {
        setLinkInput(event.target.value)
    }

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
        <form action={editHeroCardWithId}>
        <FieldGroup className="w-full m-auto flex justify-center items-center">
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title-input">Title:</FieldLabel>
                        <Input name="title_text" id="title-input" onChange={onTitleChange} value={titleInput} required />
                    </Field>
                    <Field>
                        <FieldLabel>Image:</FieldLabel>
                        <Input type="hidden" name="image_path" value={heroCard.image_path} />
                        <Dashboard
                            uppy={uppy}
                            height={300}
                            hideUploadButton
                            proudlyDisplayPoweredByUppy={false}
                            singleFileFullScreen
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Color:</FieldLabel>
                        <Input type="color" name="color" id="color-input" onChange={onColorChange} value={colorInput} />
                    </Field>
                    <Field>
                        <FieldLabel>Link:</FieldLabel>
                        <Input type="text" name="link" id="link-input" onChange={onLinkChange} value={linkInput} />
                    </Field>
                </FieldGroup>
                <ShadButton>Submit</ShadButton>
            </FieldSet>
        </FieldGroup>
        </form>
        </>
    )
}
