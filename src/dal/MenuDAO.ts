import { getDb } from "./BaseDAO";
import { menu } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllMenuItems() {
    return await getDb()?.select().from(menu)
}

export async function insertMenuItems(icon: string, menuText: string, menuLink: string) {
    return await getDb()?.insert(menu).values({icon: icon, menuText: menuText, menuLink: menuLink});
}

export async function updateMenuItems(id: number, icon: string, menuText: string, menuLink: string) {
    return await getDb()?.update(menu).set({icon: icon, menuText: menuText, menuLink: menuLink}).where(eq(menu.id, id))
}