-- CreateTable
CREATE TABLE "CreatePost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "companay" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreatePost_pkey" PRIMARY KEY ("id")
);
