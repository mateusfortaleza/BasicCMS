ALTER TABLE "hero_card" ADD COLUMN "isDeleted" boolean DEFAULT false NOT NULL;
UPDATE "hero_card" SET "isDeleted" = false WHERE "isDeleted" IS NULL;
