-- CreateTable
CREATE TABLE "BlacklistedTokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "blackListedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedTokens_token_key" ON "BlacklistedTokens"("token");
