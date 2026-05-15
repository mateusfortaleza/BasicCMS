"use client"
import { insertion } from "../dal/HeroCardDAO";
import { useState } from "react";
import { Button as ShadButton } from "@/components/ui/button"
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field"
import {Input} from "@/components/ui/input"

export default function editPage({title}) {
    const [titleInput, setTitleInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [colorInput, setColorInput] = useState("");

    function onTitleChange(event) {
        setTitleInput(event.target.value);
    }
    function onImageChange(event) {
        setImageInput(event.target.value)
    }
    function onColorChange(event) {
        setColorInput(event.target.value)
    }

    return (
        <>
            <FieldSet className="w-2xl flex justify-center">
                <FieldLegend>{title}</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title-input">Title:</FieldLabel>
                        <Input name="title" id="title-input"  />
                    </Field>
                    <Field>
                        <FieldLabel>Image:</FieldLabel>
                        <Input type="file" name="image-input" id="image-input" className="image-input" />
                    </Field>
                    <Field>
                        <FieldLabel>Color:</FieldLabel>
                        <input type="color" name="color-input" id="color-input" />
                    </Field>
                </FieldGroup>
                <ShadButton>Submit</ShadButton>
            </FieldSet>

            {/* <label htmlFor="image-input">Image: </label>
            <input value={imageInput} onChange={onImageChange} />

            <label htmlFor="color-input">Background Color: </label>
            <input value={colorInput} onChange={onColorChange} />

            <label htmlFor="Button"></label> */}
        </>
    )
}