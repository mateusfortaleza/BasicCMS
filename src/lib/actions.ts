'use server'
import { put } from "@vercel/blob"
import { z } from "zod"
import { updateHeroCard, insertHeroCard, deleteHeroCard } from "../dal/HeroCardDTO"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { deleteMenuItem, insertMenuItems, updateMenuItems } from "@/dal/MenuDTO"
import {
    deleteLanguage,
    insertLanguage,
    updateLanguage,
} from "@/dal/LanguageDTO"

// Hero Card Actions

const HeroCardFieldsSchema = z.object({
    title_text: z.string().trim().min(1).max(100),
    color: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/),
    link: z.url().max(255),
})

const EditHeroCardSchema = HeroCardFieldsSchema.extend({
    image_path: z.string(),
    image_file: z.instanceof(File).nullable(),
})
const CreateHeroCardSchema = HeroCardFieldsSchema.extend({
    image_file: z.instanceof(File),
})

export async function verifyAndUpdateHeroCard(heroCardId: string, prevState: unknown, formData: FormData) {
    const result = EditHeroCardSchema.safeParse({
        title_text: formData.get("title_text"),
        image_path: formData.get("image_path"),
        image_file: formData.get("image_file"), 
        color: formData.get("color"),
        link: formData.get("link")
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {image_path, image_file, title_text, color, link} = result.data;

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

export async function verifyAndCreateHeroCard(prevState: unknown, formData: FormData) {
    const result = CreateHeroCardSchema.safeParse({
        title_text: formData.get("title_text"),
        image_file: formData.get("image_file"),
        color: formData.get("color"),
        link: formData.get("link")
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const { image_file, title_text, color, link } = result.data;

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


// Menu Items Actions

const MenuItemsSchema = z.object({
    icon: z.string().trim().min(1),
    menuLink: z.string().trim().min(1),
    menuText: z.string().trim().min(1).max(200),
})

export async function verifyAndInsertMenuItem(prevState: unknown, formData: FormData) {
    const result = MenuItemsSchema.safeParse({
        icon: formData.get("icon"),
        menuLink: formData.get("link-input"),
        menuText: formData.get("text-input")
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {icon, menuLink, menuText} = result.data;

    await insertMenuItems(icon, menuText, menuLink);
    revalidatePath("/menu");
    redirect("/menu");
}

export async function verifyAndUpdateMenuItem(menuItemId: number, prevState: unknown, formData: FormData) {
    const result = MenuItemsSchema.safeParse({
        icon: formData.get("icon"),
        menuText: formData.get("text-input"),
        menuLink: formData.get("link-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {icon, menuLink, menuText} = result.data;

    await updateMenuItems(menuItemId, icon, menuText, menuLink);
    revalidatePath("/menu");
    redirect("/menu");
}

export async function deletionMenuItem(menuItemId: number) {
    await deleteMenuItem(menuItemId);
    revalidatePath("/menu");
}


// Language Actions

const LanguageSchema = z.object({
    languageName: z.string().trim().min(1).max(100),
    langCode: z.string().trim().min(1).max(5).toLowerCase().regex(/^[a-z]{2}$/),
})

export async function verifyAndInsertLanguage(prevState: unknown, formData: FormData) {
    const result = LanguageSchema.safeParse({
        languageName: formData.get("language-input"),
        langCode: formData.get("lang-code-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {languageName, langCode} = result.data;

    await insertLanguage(languageName, langCode);
    revalidatePath("/language");
    redirect("/language");
}

export async function verifyAndUpdateLanguage(languageId: string, prevState: unknown, formData: FormData) {
    const result = LanguageSchema.safeParse({
        languageName: formData.get("language-input"),
        langCode: formData.get("lang-code-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {languageName, langCode} = result.data;

    await updateLanguage(languageId, languageName, langCode);
    revalidatePath("/language");
    redirect("/language");
}

export async function deletionLanguage(languageId: string) {
    await deleteLanguage(languageId);
    revalidatePath("/language");
}
