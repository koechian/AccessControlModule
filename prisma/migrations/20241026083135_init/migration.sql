/*
  Warnings:

  - You are about to drop the column `projectedDuration` on the `Project` table. All the data in the column will be lost.
  - Added the required column `clientName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - The required column `projectId` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProjectUserLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "projectID" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectUserLink_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectUserLink_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "asignee" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("asignee", "createdAt", "id", "isAssigned", "projectName") SELECT "asignee", "createdAt", "id", "isAssigned", "projectName" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Engineer',
    "KRAPin" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("KRAPin", "createdAt", "email", "firstName", "id", "lastName", "phonenumber", "role", "userid") SELECT "KRAPin", "createdAt", "email", "firstName", "id", "lastName", "phonenumber", "role", "userid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phonenumber_key" ON "User"("phonenumber");
CREATE UNIQUE INDEX "User_KRAPin_key" ON "User"("KRAPin");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUserLink_userID_projectID_key" ON "ProjectUserLink"("userID", "projectID");
