'use server'
import { put } from "@vercel/blob"
import {z} from "zod"
import { updateHeroCard } from "../dal/HeroCardDAO"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const FormSchema = z.object({
    id: z.number(),
    image_path: z.string(),
    image_file: z.instanceof(File).optional(),
    title_text: z.string(),
    color: z.string(),
    link: z.string(),
})

const EditInvoice = FormSchema.omit({id: true})

export async function verifyAndUpdateHeroCard(heroCardId: number, formData: FormData) {
    const {image_path, image_file, title_text, color, link} = EditInvoice.parse({
        title_text: formData.get("title_text"),
        image_path: formData.get("image_path"),
        image_file: formData.get("image_file"),
        color: formData.get("color"),
        link: formData.get("link")
    })

    let savedImagePath = image_path;

    if (image_file && image_file.size > 0) {
        const blob = await put(`hero-cards/${image_file.name}`, image_file, {
            access: "public",
            addRandomSuffix: true,
        });

        savedImagePath = blob.url;
    }

    await updateHeroCard(heroCardId, savedImagePath, title_text, color, link)
    revalidatePath("/herocard/edit/");
    redirect("/herocard/edit")
}
