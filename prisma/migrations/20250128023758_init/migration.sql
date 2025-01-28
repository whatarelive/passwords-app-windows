-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WebsAccounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "webName" TEXT NOT NULL,
    "webUser" TEXT NOT NULL,
    "webPassword" TEXT NOT NULL,
    "webUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "WebsAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WebsAccounts_id_key" ON "WebsAccounts"("id");
