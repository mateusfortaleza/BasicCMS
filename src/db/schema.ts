import { pgTable, integer, varchar, boolean, text } from "drizzle-orm/pg-core"

export const heroCard = pgTable("hero_card", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "hero_card_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundImage: text("background_image").notNull(),
	overlayColor: varchar("overlay_color", { length: 7 }).notNull(),
	title: varchar("title", { length: 100 }).notNull(),
	link: varchar("link", { length: 255 }).notNull(),
	isDeleted: boolean("is_deleted").notNull().default(false),
});

export const menu = pgTable("menu", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	icon: text().notNull(),
	menuText: text().notNull(),
	menuLink: text().notNull(),
})