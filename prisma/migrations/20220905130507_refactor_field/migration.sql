/*
  Warnings:

  - You are about to drop the column `created_at` on the `user_detail` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_detail` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_detail" (
    "idUser" INTEGER,
    "email" TEXT,
    "image" TEXT,
    "name" TEXT,
    "nop" TEXT,
    "role" TEXT,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_user_detail" ("email", "id", "idUser", "image", "name", "nop", "role") SELECT "email", "id", "idUser", "image", "name", "nop", "role" FROM "user_detail";
DROP TABLE "user_detail";
ALTER TABLE "new_user_detail" RENAME TO "user_detail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
