import { pgTable, integer, varchar, boolean, text, uuid } from "drizzle-orm/pg-core"

export const heroCard = pgTable("hero_card", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "hero_card_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundImage: text("background_image").notNull(),
	overlayColor: varchar("overlay_color", { length: 7 }).notNull(),
	title: varchar("title", { length: 100 }).notNull(),
	link: varchar("link", { length: 255 }).notNull(),
	isDeleted: boolean("is_deleted").notNull().default(false),
	id_lang: varchar({length: 2}).notNull().default("en").references(() => language.langCode)
});

export const menu = pgTable("menu", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	icon: text().notNull(),
	menuText: varchar({length: 200}).notNull(),
	menuLink: text().notNull(),
	isDeleted: boolean("is_deleted").notNull().default(false),
})

export const language = pgTable("language", {
	id: uuid().primaryKey().defaultRandom(),
	language: varchar({length: 100}).notNull().unique(),
	langCode: varchar("lang_code", {length: 2}).notNull().unique(),
})

export const heroCardFields = pgTable("hero_card_fields", {
	id: uuid().primaryKey().defaultRandom(),
	backgroundImage: text("background_image").notNull(),
	overlayColor: varchar("overlay_color", { length: 7 }).notNull(),
	title: varchar("title", { length: 100 }).notNull(),
	link: varchar("link", { length: 255 }).notNull(),
	isDeleted: boolean("is_deleted").notNull().default(false)
})