"use client"
import { verifyAndUpdateHeroCard } from "@/backend/actions";
import { ChangeEvent, useState } from "react";
import { Button as ShadButton } from "@/components/ui/button"
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field"
import {Input} from "@/components/ui/input"


export default function editPage({title, heroCard}: {title: string, heroCard: any}) {
    const [titleInput, setTitleInput] = useState(heroCard.title_text);
    const [colorInput, setColorInput] = useState(heroCard.color);
    const [linkInput, setLinkInput] = useState(heroCard.link)
    const editHeroCardWithId = verifyAndUpdateHeroCard.bind(null, heroCard.id);

    function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitleInput(event.target.value);
    }
    function onColorChange(event: ChangeEvent<HTMLInputElement>) {
        setColorInput(event.target.value)
    }
    function onLinkChange(event: ChangeEvent<HTMLInputElement>) {
        setLinkInput(event.target.value)
    }

    return (
        <>      
        <form action={editHeroCardWithId}>
        <FieldGroup className="w-full h-screen m-auto flex justify-center items-center">
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title-input">Title:</FieldLabel>
                        <Input name="title_text" id="title-input" onChange={onTitleChange} value={titleInput} required />
                    </Field>
                    <Field>
                        <FieldLabel>Image:</FieldLabel>
                        <input type="hidden" name="image_path" value={heroCard.image_path} />
                        <Input type="file" name="image_file" id="image-input" className="image-input" accept="image/png,image/jpeg,image/webp,image/gif" />
                    </Field>
                    <Field>
                        <FieldLabel>Color:</FieldLabel>
                        <input type="color" name="color" id="color-input" onChange={onColorChange} value={colorInput} />
                    </Field>
                    <Field>
                        <FieldLabel>Link:</FieldLabel>
                        <input type="text" name="link" id="link-input" onChange={onLinkChange} />
                    </Field>
                </FieldGroup>
                <ShadButton>Submit</ShadButton>
            </FieldSet>
        </FieldGroup>
        </form>
        </>
    )
}
