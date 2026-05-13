-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "hero_card" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hero_card_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"background_image" varchar(200) NOT NULL,
	"overlay_color" varchar(7) NOT NULL,
	"title" varchar(100) NOT NULL,
	"link" varchar(255) NOT NULL
);

*/