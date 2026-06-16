'use server'
import { put } from "@vercel/blob"
import { z } from "zod"
import { updateHeroCardFields, insertHeroCardFields, insertHeroCard, deleteHeroCard, updateHeroCardName } from "../dal/HeroCardDTO"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { deleteMenuItem, insertMenuItems, updateMenuItems } from "@/dal/MenuDTO"
import {
    deleteLanguage,
    insertLanguage,
    updateLanguage,
} from "@/dal/LanguageDTO"
import {
    deleteContentType,
    insertContentType,
    insertContentTypeFields,
    updateContentType,
    updateContentTypeField,
} from "@/dal/ContentTypeDTO"
import {
    deleteContent,
    deleteContentFieldsByContentId,
    insertContent,
    insertContentFields,
    updateContent,
} from "@/dal/ContentDTO"


const HeroCardFieldsSchema = z.object({
    title_text: z.string().trim().min(1).max(100),
    color: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/),
    link: z.string().max(500),
})

const EditHeroCardSchema = HeroCardFieldsSchema.extend({
    heroCard_name: z.string().trim().min(1).max(80),
    image_path: z.string(),
    image_file: z.instanceof(File).nullable(),
})
const CreateHeroCardSchema = HeroCardFieldsSchema.extend({
    heroCard_name: z.string().trim().min(1).max(80),
    image_file: z.instanceof(File),
    language_id: z.string().trim().regex(/^[a-z]{2}$/),
})

// Hero Card Actions
export async function verifyAndUpdateHeroCard(heroCardFieldsId: string, heroCardId: number, prevState: unknown, formData: FormData) {
    const result = EditHeroCardSchema.safeParse({
        heroCard_name: formData.get("heroCard_name"),
        title_text: formData.get("title_text"),
        image_path: formData.get("image_path"),
        image_file: formData.get("image_file"), 
        color: formData.get("color"),
        link: formData.get("link"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {heroCard_name, image_path, image_file, title_text, color, link} = result.data;

    let savedImagePath = image_path;

    if (image_file && image_file.size > 0) {
        const blob = await put(`hero-cards/${crypto.randomUUID()}-${image_file.name}`, image_file, {
            access: "public",
            addRandomSuffix: true,
        });

        savedImagePath = blob.url;
    }

    if (!savedImagePath) throw new Error("No image path")
    await updateHeroCardFields(heroCardFieldsId, savedImagePath, title_text, color, link);
    await updateHeroCardName(heroCardId, heroCard_name)
    revalidatePath("/herocard");
    redirect("/herocard");
}

export async function verifyAndCreateHeroCard(prevState: unknown, formData: FormData) {
    const result = CreateHeroCardSchema.safeParse({
        title_text: formData.get("title_text"),
        image_file: formData.get("image_file"),
        color: formData.get("color"),
        link: formData.get("link"),
        heroCard_name: formData.get("heroCard_name"),
        language_id: formData.get("language_id"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }
    const {
        image_file,
        title_text,
        color,
        link,
        heroCard_name,
        language_id,
    } = result.data;

    const blob = await put(`hero-cards/${crypto.randomUUID()}-${image_file.name}`, image_file, {
        access: "public",
        addRandomSuffix: true
    })

    const [createdHeroCard] = await insertHeroCard(heroCard_name);
    await insertHeroCardFields(
        blob.url,
        title_text,
        color,
        link,
        createdHeroCard.id,
        language_id,
    );
    revalidatePath("/herocard");
    redirect("/herocard")
}

export async function deletionHeroCard(id: number) {
    await deleteHeroCard(id);
    revalidatePath("/herocard");
}



// Menu Items Actions
const MenuItemsSchema = z.object({
    menuLink: z.string().trim().min(1),
    menuText: z.string().trim().min(1).max(200),
})

const SvgFileSchema = z.instanceof(File).refine(
    (file) =>
        file.type === "image/svg+xml" &&
        file.name.toLowerCase().endsWith(".svg"),
    "Only SVG files are allowed",
)

const CreateMenuItemSchema = MenuItemsSchema.extend({
    svg_url: SvgFileSchema,
})

const EditMenuItemSchema = MenuItemsSchema.extend({
    svg_url: z.union([z.url(), SvgFileSchema]),
})

export async function verifyAndInsertMenuItem(prevState: unknown, formData: FormData) {
    const result = CreateMenuItemSchema.safeParse({
        svg_url: formData.get("svg_url"),
        menuLink: formData.get("link-input"),
        menuText: formData.get("text-input")
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {svg_url: svgFile, menuLink, menuText} = result.data;

    const blob = await put(`menu-icons/${crypto.randomUUID()}-${svgFile.name}`, svgFile, {
        access: "public",
        addRandomSuffix: true,
        contentType: "image/svg+xml",
    })

    await insertMenuItems(blob.url, menuText, menuLink);
    revalidatePath("/menu");
    redirect("/menu");
}

export async function verifyAndUpdateMenuItem(menuItemId: number, prevState: unknown, formData: FormData) {
    const result = EditMenuItemSchema.safeParse({
        svg_url: formData.get("svg_url"),
        menuText: formData.get("text-input"),
        menuLink: formData.get("link-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const {svg_url, menuLink, menuText} = result.data;

    const savedSvgUrl = svg_url instanceof File ? (await put(`menu-icons/${crypto.randomUUID()}-${svg_url.name}`, svg_url, {
            access: "public",
            addRandomSuffix: true,
            contentType: "image/svg+xml",
        })).url : svg_url;

    await updateMenuItems(menuItemId, savedSvgUrl, menuText, menuLink);
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



// Content Type Actions
const ContentTypeSchema = z.object({
    contentTypeId: z.string().trim().min(1).max(200),
    contentTypeName: z.string().trim().min(1).max(200),
})

const CreateContentTypeSchema = ContentTypeSchema.extend({
    fieldNames: z.array(z.string().trim().min(1).max(1000)).min(1),
    fieldTypes: z.array(z.enum(["string", "number", "datetime", "image"])).min(1),
}).refine(
    ({ fieldNames, fieldTypes }) => fieldNames.length === fieldTypes.length,
    { message: "Every field must have a name and type", path: ["fieldNames"] },
)

const EditContentTypeSchema = CreateContentTypeSchema.extend({
    fieldIds: z.array(
        z.union([
            z.literal(""),
            z.coerce.number().int().positive(),
        ]),
    ),
}).refine(
    ({ fieldIds, fieldNames }) => fieldIds.length === fieldNames.length,
    { message: "Every field must have an ID", path: ["fieldIds"] },
)

export async function verifyAndInsertContentType(prevState: unknown, formData: FormData) {
    const result = CreateContentTypeSchema.safeParse({
        contentTypeId: formData.get("content-type-id-input"),
        contentTypeName: formData.get("content-type-name-input"),
        fieldNames: formData.getAll("field-name-input"),
        fieldTypes: formData.getAll("field-type-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const [createdContentType] = await insertContentType(
        result.data.contentTypeId,
        result.data.contentTypeName,
    )
    await insertContentTypeFields(
        createdContentType.id,
        result.data.fieldNames.map((fieldName, index) => ({
            fieldName,
            fieldType: result.data.fieldTypes[index],
        })),
    )
    revalidatePath("/content-type")
    redirect("/content-type")
}

export async function verifyAndUpdateContentType(contentTypeId: number, prevState: unknown, formData: FormData) {
    const result = EditContentTypeSchema.safeParse({
        contentTypeId: formData.get("content-type-id-input"),
        contentTypeName: formData.get("content-type-name-input"),
        fieldIds: formData.getAll("field-id-input"),
        fieldNames: formData.getAll("field-name-input"),
        fieldTypes: formData.getAll("field-type-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    await updateContentType(
        contentTypeId,
        result.data.contentTypeId,
        result.data.contentTypeName,
    )

    const existingFields = result.data.fieldNames.flatMap((fieldName, index) => {
        const id = result.data.fieldIds[index]

        return typeof id === "number"
            ? [{
                id,
                fieldName,
                fieldType: result.data.fieldTypes[index],
            }]
            : []
    })

    const newFields = result.data.fieldNames.flatMap((fieldName, index) =>
        result.data.fieldIds[index] === ""
            ? [{
                fieldName,
                fieldType: result.data.fieldTypes[index],
            }]
            : [],
    )

    await Promise.all(
        existingFields.map((field) =>
            updateContentTypeField(
                field.id,
                contentTypeId,
                field.fieldName,
                field.fieldType,
            ),
        ),
    )

    if (newFields.length > 0) {
        await insertContentTypeFields(contentTypeId, newFields)
    }

    revalidatePath("/content-type")
    redirect("/content-type")
}

export async function deletionContentType(contentTypeId: number) {
    await deleteContentType(contentTypeId)
    revalidatePath("/content-type")
}



// Content Actions
const ContentSchema = z.object({
    name: z.string().trim().min(1).max(200),
    contentTypeId: z.coerce.number().int().positive(),
    contentTypeFieldIds: z.array(z.coerce.number().int().positive()).min(1),
    values: z.array(
        z.union([
            z.string().trim().max(200),
            z.instanceof(File),
        ]),
    ).min(1),
}).refine(
    ({ contentTypeFieldIds, values }) =>
        contentTypeFieldIds.length === values.length,
    {
        message: "Every field must have a value",
        path: ["values"],
    },
)

async function uploadContentValues(values: (string | File)[]) {
    return Promise.all(
        values.map(async (value) => {
            if (typeof value === "string") return value

            const blob = await put(
                `content/${crypto.randomUUID()}-${value.name}`,
                value,
                {
                    access: "public",
                    addRandomSuffix: true,
                },
            )

            return blob.url
        }),
    )
}

export async function verifyAndInsertContent(prevState: unknown, formData: FormData) {
    const result = ContentSchema.safeParse({
        name: formData.get("content-name-input"),
        contentTypeId: formData.get("content-type-input"),
        contentTypeFieldIds: formData.getAll("content-type-field-id-input"),
        values: formData.getAll("content-field-value-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const savedValues = await uploadContentValues(result.data.values)

    const [createdContent] = await insertContent(
        result.data.name,
        result.data.contentTypeId,
    )

    await insertContentFields(
        createdContent.id,
        result.data.contentTypeFieldIds.map((contentTypeFieldId, index) => ({
            contentTypeFieldId,
            value: savedValues[index],
        })),
    )

    revalidatePath("/content")
    redirect("/content")
}

export async function verifyAndUpdateContent(contentId: number, prevState: unknown, formData: FormData) {
    const result = ContentSchema.safeParse({
        name: formData.get("content-name-input"),
        contentTypeId: formData.get("content-type-input"),
        contentTypeFieldIds: formData.getAll("content-type-field-id-input"),
        values: formData.getAll("content-field-value-input"),
    })

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        }
    }

    const savedValues = await uploadContentValues(result.data.values)

    await updateContent(contentId, result.data.name, result.data.contentTypeId)
    await deleteContentFieldsByContentId(contentId)
    await insertContentFields(
        contentId,
        result.data.contentTypeFieldIds.map((contentTypeFieldId, index) => ({
            contentTypeFieldId,
            value: savedValues[index],
        })),
    )

    revalidatePath("/content")
    redirect("/content")
}

export async function deletionContent(contentId: number) {
    await deleteContent(contentId)
    revalidatePath("/content")
}
