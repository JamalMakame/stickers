-- CreateTable
CREATE TABLE "CartItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "stickerName" TEXT NOT NULL,
    "stickerImage" TEXT NOT NULL,
    "stickerId" TEXT NOT NULL,
    "stickerPrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "stickerSize" TEXT NOT NULL,
    CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
