-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "todoListId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Account.provider_providerAccountId_unique" RENAME TO "Account_provider_providerAccountId_key";

-- RenameIndex
ALTER INDEX "Session.sessionToken_unique" RENAME TO "Session_sessionToken_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "VerificationToken.identifier_token_unique" RENAME TO "VerificationToken_identifier_token_key";

-- RenameIndex
ALTER INDEX "VerificationToken.token_unique" RENAME TO "VerificationToken_token_key";
