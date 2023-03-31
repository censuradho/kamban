/*
  Warnings:

  - Added the required column `position` to the `columns` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_columns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "kamban_id" TEXT NOT NULL,
    CONSTRAINT "columns_kamban_id_fkey" FOREIGN KEY ("kamban_id") REFERENCES "kamban_boards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_columns" ("id", "kamban_id", "name") SELECT "id", "kamban_id", "name" FROM "columns";
DROP TABLE "columns";
ALTER TABLE "new_columns" RENAME TO "columns";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
