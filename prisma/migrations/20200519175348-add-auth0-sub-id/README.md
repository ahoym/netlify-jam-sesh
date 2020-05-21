# Migration `20200519175348-add-auth0-sub-id`

This migration has been generated at 5/19/2020, 5:53:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "subId" text  NOT NULL ;

CREATE UNIQUE INDEX "User.subId" ON "public"."User"("subId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200518232716-init..20200519175348-add-auth0-sub-id
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = env("DATABASE_URL")
 }
 model UserProfile {
   id     Int     @default(uuid()) @id
@@ -14,5 +14,6 @@
   id      Int      @default(uuid()) @id
   email   String   @unique
   name    String?
   profile UserProfile?
+  subId   String   @unique
 }
```


