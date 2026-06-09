import { relations } from "drizzle-orm/relations";
import { language, heroCardFields } from "../db/schema";

export const heroCardFieldsRelations = relations(heroCardFields, ({one}) => ({
	language: one(language, {
		fields: [heroCardFields.languageId],
		references: [language.langCode]
	}),
}));

export const languageRelations = relations(language, ({many}) => ({
	heroCardFields: many(heroCardFields),
}));