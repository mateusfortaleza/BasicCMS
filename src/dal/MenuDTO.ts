import { getDb } from "./BaseDTO";
import { menu } from "@/db/schema";
import { eq } from "drizzle-orm";

function getDbOrThrow() {
    const db = getDb();
    if (!db) throw new Error("Database connection is not initialized");
    return db;
}

export async function getAllMenuItems() {
    return await getDbOrThrow().select().from(menu)
}

export async function getMenuItemsById(id: number) {
    return await getDbOrThrow().select().from(menu).where(eq(menu.id, id))
}

export async function insertMenuItems(svg_url: string, menuText: string, menuLink: string) {
    return await getDbOrThrow().insert(menu).values({svg_url, menuText, menuLink});
}

export async function updateMenuItems(id: number, svg_url: string, menuText: string, menuLink: string) {
    return await getDbOrThrow().update(menu).set({svg_url, menuText, menuLink}).where(eq(menu.id, id))
}

export async function deleteMenuItem(id: number) {
    return await getDbOrThrow().update(menu).set({isDeleted: true}).where(eq(menu.id, id));
}
