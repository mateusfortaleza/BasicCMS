CREATE TABLE "language" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" varchar(100) NOT NULL,
	"langCode" integer GENERATED ALWAYS AS IDENTITY (sequence name "language_langCode_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1)
);
