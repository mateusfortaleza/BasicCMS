CREATE TABLE "content_type" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "content_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content_name" varchar(200) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu" RENAME COLUMN "icon" TO "svg_url";--> statement-breakpoint
ALTER TABLE "hero_card" ADD COLUMN "is_hero_card_deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "hero_card_fields" DROP COLUMN "is_deleted";