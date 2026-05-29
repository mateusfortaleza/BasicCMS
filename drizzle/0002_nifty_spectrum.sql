ALTER TABLE "menu" ALTER COLUMN "menuText" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "menu" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;