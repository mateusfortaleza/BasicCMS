"use client"
import { ChangeEvent, useState } from "react";
import { Button as ShadButton } from "@/components/ui/button"
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field"
import {Input} from "@/components/ui/input"

export default function editPage({title}: {title: string}) {
    const [titleInput, setTitleInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [linkInput, setLinkInput] = useState("")

    function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitleInput(event.target.value);
    }
    function onImageChange(event: ChangeEvent<HTMLInputElement>) {
        setImageInput(event.target.value)
    }
    function onColorChange(event: ChangeEvent<HTMLInputElement>) {
        setColorInput(event.target.value)
    }
    function onLinkChange(event: ChangeEvent<HTMLInputElement>) {
        setLinkInput(event.target.value)
    }

    return (
        <>
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title-input">Title:</FieldLabel>
                        <Input name="title" id="title-input" onChange={onTitleChange} />
                    </Field>
                    <Field>
                        <FieldLabel>Image:</FieldLabel>
                        <Input type="file" name="image-input" id="image-input" className="image-input" onChange={onImageChange} />
                    </Field>
                    <Field>
                        <FieldLabel>Color:</FieldLabel>
                        <input type="color" name="color-input" id="color-input" onChange={onColorChange} />
                    </Field>
                    <Field>
                        <FieldLabel>Link:</FieldLabel>
                        <input type="text" name="link-input" id="link-input" onChange={onLinkChange} />
                    </Field>
                </FieldGroup>
                <ShadButton>Submit</ShadButton>
            </FieldSet>
        </>
    )
}