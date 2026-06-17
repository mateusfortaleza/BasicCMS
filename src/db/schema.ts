import { pgTable, integer, text, varchar, boolean, unique, uuid, foreignKey } from "drizzle-orm/pg-core"

export const menu = pgTable("menu", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "menu_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	svg_url: text().notNull(),
	menuText: varchar({ length: 200 }).notNull(),
	menuLink: text().notNull(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
});

export const language = pgTable("language", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	language: varchar({ length: 100 }).notNull(),
	langCode: varchar("lang_code", { length: 2 }).notNull(),
}, (table) => [
	unique("language_language_unique").on(table.language),
	unique("language_lang_code_unique").on(table.langCode),
]);

export const heroCardFields = pgTable("hero_card_fields", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	backgroundImage: text("background_image").notNull(),
	overlayColor: varchar("overlay_color", { length: 7 }).notNull(),
	title: varchar({ length: 100 }).notNull(),
	link: varchar({ length: 255 }).notNull(),
	// isDeleted: boolean("is_deleted").default(false).notNull(),
	heroCardId: integer("hero_card_id").references(() => heroCard.id),
	languageId: varchar("language_id", { length: 2 }).default('en').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.languageId],
			foreignColumns: [language.langCode],
			name: "hero_card_fields_language_id_language_lang_code_fk"
		}),
]);

export const heroCard = pgTable("hero_card", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "hero_card_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	heroCardName: varchar("hero_card_name", {length: 80}).notNull().unique(),
	isHeroCardDeleted: boolean("is_hero_card_deleted").default(false).notNull()
});

export const contentType = pgTable("content_type", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	contentTypeId: varchar("content_type_id", { length: 200 }).unique().notNull(),
	contentTypeName: varchar("content_type_name", {length: 200}).notNull(),
})

export const contentTypeFields = pgTable("content_type_fields", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	contentTypeId: varchar("content_type_id", { length: 200 }).notNull().references(() => contentType.contentTypeId, { onDelete: "cascade" }),
	fieldName: varchar("field_name", {length: 200}).notNull(),
	fieldType: varchar("field_type", {length: 200}).$type<"string" | "number" | "datetime" | "image">().notNull(),
})

export const content = pgTable("content", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	contentTypeId: varchar("content_type_id", { length: 200 }).notNull().references(() => contentType.contentTypeId, { onDelete: "cascade" }),
	name: varchar({ length: 200 }).notNull().unique(),
})

export const contentFields = pgTable("content_fields", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	contentId: integer("content_id").notNull().references(() => content.id, { onDelete: "cascade" }),
	contentTypeFieldId: integer("content_type_field_id").notNull().references(() => contentTypeFields.id, { onDelete: "cascade" }),
	value: varchar({ length: 200 }).notNull(),
})
