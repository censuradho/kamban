-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_columns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "kamban_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "columns_kamban_id_fkey" FOREIGN KEY ("kamban_id") REFERENCES "kamban_boards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_columns" ("id", "kamban_id", "name", "position") SELECT "id", "kamban_id", "name", "position" FROM "columns";
DROP TABLE "columns";
ALTER TABLE "new_columns" RENAME TO "columns";
CREATE TABLE "new_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "column_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tasks_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "columns" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("column_id", "description", "id", "name") SELECT "column_id", "description", "id", "name" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE TABLE "new_kamban_boards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_kamban_boards" ("id", "name") SELECT "id", "name" FROM "kamban_boards";
DROP TABLE "kamban_boards";
ALTER TABLE "new_kamban_boards" RENAME TO "kamban_boards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
