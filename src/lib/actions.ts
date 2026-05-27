'use server'
import { put } from "@vercel/blob"
import { z } from "zod"
import { updateHeroCard, insertHeroCard, deleteHeroCard } from "../dal/HeroCardDAO"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const HeroCardFieldsSchema = z.object({
    title_text: z.string().trim(),
    color: z.string().trim(),
    link: z.string().trim(),
})

const EditHeroCardSchema = HeroCardFieldsSchema.extend({
    image_path: z.string(),
    image_file: z.instanceof(File).nullable(),
})
const CreateHeroCardSchema = HeroCardFieldsSchema.extend({
    image_file: z.instanceof(File),
})

export async function verifyAndUpdateHeroCard(heroCardId: number, formData: FormData) {
    const {image_path, image_file, title_text, color, link} = EditHeroCardSchema.parse({
        title_text: formData.get("title_text"),
        image_path: formData.get("image_path"),
        image_file: formData.get("image_file"), 
        color: formData.get("color"),
        link: formData.get("link")
    })

    let savedImagePath = image_path;

    if (image_file && image_file.size > 0) {
        const blob = await put(`hero-cards/${crypto.randomUUID()}-${image_file.name}`, image_file, {
            access: "public",
            addRandomSuffix: true,
        });

        savedImagePath = blob.url;
    }

    if (!savedImagePath) throw new Error("No image path")
    await updateHeroCard(heroCardId, savedImagePath, title_text, color, link)
    revalidatePath("/herocard");
    redirect("/herocard")
}

export async function verifyAndCreateHeroCard(formData: FormData) {
    const { image_file, title_text, color, link } = CreateHeroCardSchema.parse({
        title_text: formData.get("title_text"),
        image_file: formData.get("image_file"),
        color: formData.get("color"),
        link: formData.get("link")
    })

    const blob = await put(`hero-cards/${crypto.randomUUID()}-${image_file.name}`, image_file, {
        access: "public",
        addRandomSuffix: true
    })

    await insertHeroCard(blob.url, title_text, color, link)
    revalidatePath("/herocard");
    redirect("/herocard")
}

export async function deletionHeroCard(id: number) {
    await deleteHeroCard(id);
    revalidatePath("/herocard");
}