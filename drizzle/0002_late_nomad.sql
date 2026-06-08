ALTER TABLE "hero_card" ADD COLUMN "hero_card_name" varchar(80) NOT NULL;--> statement-breakpoint
ALTER TABLE "hero_card" ADD CONSTRAINT "hero_card_hero_card_name_unique" UNIQUE("hero_card_name");