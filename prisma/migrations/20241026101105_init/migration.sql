-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Engineer',
    "KRAPin" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
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

-- CreateTable
CREATE TABLE "ProjectUserLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "projectID" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectUserLink_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectUserLink_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phonenumber_key" ON "User"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_KRAPin_key" ON "User"("KRAPin");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUserLink_userID_projectID_key" ON "ProjectUserLink"("userID", "projectID");
