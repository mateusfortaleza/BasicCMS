'use server'
import { put } from "@vercel/blob"
import { z } from "zod"
import { updateHeroCard, insertHeroCard } from "../dal/HeroCardDAO"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const FormSchema = z.object({
    id: z.number(),
    image_path: z.string(),
    image_file: z.instanceof(File),
    title_text: z.string().trim(),
    color: z.string().trim(),
    link: z.string().trim(),
})

const EditHeroCardSchema = FormSchema.omit({id: true})
const CreateHeroCardSchema = FormSchema.omit({id: true, image_path: true})

/**
 * Validate update form input, optionally upload a new image, persist the updated HeroCard, then revalidate and redirect to /herocard.
 *
 * @param heroCardId - The numeric ID of the HeroCard to update.
 * @param formData - Submitted FormData expected to contain `image_path`, `image_file`, `title_text`, `color`, and `link`.
 * @throws Error if no final image path is available after validation and optional upload.
 */
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

/**
 * Validate input, upload the provided image, create a new HeroCard record, then refresh and navigate to /herocard.
 *
 * Expects `formData` to contain the fields:
 * - `image_file`: File - the image to upload (required)
 * - `title_text`: string - card title (trimmed)
 * - `color`: string - card color value (trimmed)
 * - `link`: string - destination URL (trimmed)
 *
 * The function uploads the image to public blob storage, persists the new card with the uploaded image URL, triggers revalidation of `/herocard`, and redirects to `/herocard`.
 */
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