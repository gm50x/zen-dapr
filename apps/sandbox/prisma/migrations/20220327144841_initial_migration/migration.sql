-- CreateTable
CREATE TABLE "Gibberish" (
    "id" VARCHAR(36) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Gibberish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gibberish_value_key" ON "Gibberish"("value");
