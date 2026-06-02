CREATE TABLE "hero_card_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"background_image" text NOT NULL,
	"overlay_color" varchar(7) NOT NULL,
	"title" varchar(100) NOT NULL,
	"link" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hero_card" ADD COLUMN "id_lang" varchar(2) DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "language" ADD CONSTRAINT "language_language_unique" UNIQUE("language");--> statement-breakpoint
ALTER TABLE "language" ADD CONSTRAINT "language_lang_code_unique" UNIQUE("lang_code");