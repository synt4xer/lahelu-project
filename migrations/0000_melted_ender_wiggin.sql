CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_username_idx" ON "users" USING btree ("username","password");--> statement-breakpoint
CREATE INDEX "users_cursor_idx" ON "users" USING btree ("created_at" DESC NULLS LAST,"id","username");