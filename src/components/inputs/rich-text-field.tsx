"use client";

import { Editor } from "@tinymce/tinymce-react";
import { Input } from "../ui/input";
import { useState } from "react";

const TINYMCE_API_KEY =
  process.env.NEXT_PUBLIC_TINYMCE_API_KEY ??
  "e14uoagb2fizvw1085uufe1rv186ldig3im2l7k1br28ouy4";

type TinyEditorProps = {
    id?: string;
    name?: string;
    richTextFieldValue?: string;
    disabled?: boolean;
};

export function TinyEditor({id = "rich-text-editor", name, richTextFieldValue = "<p>Start writing...</p>", disabled = false}: TinyEditorProps) {
    const [value, setValue] = useState(richTextFieldValue)
    return (
    <>
        {name && <Input type="hidden" name={name} value={value} />}
        <Editor
        id={id}
        apiKey={TINYMCE_API_KEY}
        initialValue={richTextFieldValue}
        disabled={disabled}
        onEditorChange={setValue}
        init={{
            height: 560,
            menubar: true,
            plugins: [
            "accordion",
            "advlist",
            "anchor",
            "autolink",
            "autoresize",
            "autosave",
            "charmap",
            "code",
            "codesample",
            "directionality",
            "emoticons",
            "fullscreen",
            "help",
            "image",
            "importcss",
            "insertdatetime",
            "link",
            "lists",
            "media",
            "nonbreaking",
            "pagebreak",
            "preview",
            "quickbars",
            "save",
            "searchreplace",
            "table",
            "visualblocks",
            "visualchars",
            "wordcount",
            "powerpaste", // Cleaner pasted content for general CMS editing workflows
            "tinycomments", // Embedded review notes for collaborative content feedback
            ],
            toolbar:
            "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | "
            + 'bullist numlist | link image media table',
            tinycomments_mode: "embedded",
            tinymceai_token_provider: async () => {
            // Trial token provider.
            // For production, replace with your own backend JWT endpoint.
            // See: https://www.tiny.cloud/docs/tinymce/latest/tinymceai-jwt-authentication-intro/
            await fetch(
                `https://demo.api.tiny.cloud/1/e14uoagb2fizvw1085uufe1rv186ldig3im2l7k1br28ouy4/auth/random`,
                { method: "POST", credentials: "include" },
            );

            return {
                token: await fetch(
                `https://demo.api.tiny.cloud/1/e14uoagb2fizvw1085uufe1rv186ldig3im2l7k1br28ouy4/jwt/tinymceai`,
                { credentials: "include" },
                ).then((response) => response.text()),
            };
            },
        }}
        />
    </>
  );
}
