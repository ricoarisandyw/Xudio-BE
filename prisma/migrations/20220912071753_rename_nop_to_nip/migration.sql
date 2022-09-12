/*
  Warnings:

  - You are about to drop the column `nop` on the `user_detail` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_detail" (
    "idUser" INTEGER,
    "email" TEXT,
    "image" TEXT,
    "name" TEXT,
    "nip" TEXT,
    "role" TEXT,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_user_detail" ("createdAt", "email", "id", "idUser", "image", "name", "role", "updatedAt") SELECT "createdAt", "email", "id", "idUser", "image", "name", "role", "updatedAt" FROM "user_detail";
DROP TABLE "user_detail";
ALTER TABLE "new_user_detail" RENAME TO "user_detail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
