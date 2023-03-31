-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "column_id" TEXT NOT NULL,
    CONSTRAINT "tasks_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "columns" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("column_id", "description", "id", "name") SELECT "column_id", "description", "id", "name" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE TABLE "new_columns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "kamban_id" TEXT NOT NULL,
    CONSTRAINT "columns_kamban_id_fkey" FOREIGN KEY ("kamban_id") REFERENCES "kamban_boards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_columns" ("id", "kamban_id", "name") SELECT "id", "kamban_id", "name" FROM "columns";
DROP TABLE "columns";
ALTER TABLE "new_columns" RENAME TO "columns";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
