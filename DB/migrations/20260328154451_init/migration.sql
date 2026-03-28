-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "mainActivities" TEXT[],
    "attractions" JSONB NOT NULL,
    "facts" JSONB NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_slug_key" ON "regions"("slug");
