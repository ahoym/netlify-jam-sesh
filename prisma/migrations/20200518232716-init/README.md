# Migration `20200518232716-init`

This migration has been generated at 5/18/2020, 11:27:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."UserProfile" (
"bio" text   ,"id" integer  NOT NULL ,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" integer  NOT NULL ,"name" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "UserProfile.userId" ON "public"."UserProfile"("userId")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."UserProfile" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200518232716-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+datasource db {
+  provider = "postgresql"
+  url = env("DATABASE_URL")
+}
+
+model UserProfile {
+  id     Int     @default(uuid()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+
+model User {
+  id      Int      @default(uuid()) @id
+  email   String   @unique
+  name    String?
+  profile UserProfile?
+}
```


