import { pgTable, integer, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const heroCard = pgTable("hero_card", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "hero_card_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundImage: varchar("background_image", { length: 200 }).notNull(),
	overlayColor: varchar("overlay_color", { length: 7 }).notNull(),
	title: varchar({ length: 100 }).notNull(),
	link: varchar({ length: 255 }).notNull(),
});
