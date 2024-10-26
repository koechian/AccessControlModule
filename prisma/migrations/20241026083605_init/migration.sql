-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "isAssigned" BOOLEAN NOT NULL,
    "asignee" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("asignee", "clientName", "createdAt", "description", "endDate", "id", "isAssigned", "projectId", "projectName", "startDate", "status", "updatedAt") SELECT "asignee", "clientName", "createdAt", "description", "endDate", "id", "isAssigned", "projectId", "projectName", "startDate", "status", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
