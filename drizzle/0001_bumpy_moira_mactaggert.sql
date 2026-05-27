CREATE TABLE "menu" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "menu_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"icon" text NOT NULL,
	"menuText" text NOT NULL,
	"menuLink" text NOT NULL
);
