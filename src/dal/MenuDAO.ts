import { getDb, getTableData } from "./BaseDAO";
import { menu } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllMenuItems() {
    return await getTableData(menu);
}

console.log(await getAllMenuItems());