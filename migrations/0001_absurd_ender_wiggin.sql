CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"media_url" text NOT NULL,
	"media_width" integer NOT NULL,
	"media_height" integer NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "posts_cursor_user_idx" ON "posts" USING btree ("created_at" DESC NULLS LAST,"id","user_id");--> statement-breakpoint
CREATE INDEX "posts_privacy_time_idx" ON "posts" USING btree ("is_private","created_at" DESC NULLS LAST,"id");