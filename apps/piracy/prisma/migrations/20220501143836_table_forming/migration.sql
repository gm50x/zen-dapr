-- CreateTable
CREATE TABLE "Persona" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(250) NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonaToShip" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PersonaToShip_AB_unique" ON "_PersonaToShip"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonaToShip_B_index" ON "_PersonaToShip"("B");

-- AddForeignKey
ALTER TABLE "_PersonaToShip" ADD CONSTRAINT "_PersonaToShip_A_fkey" FOREIGN KEY ("A") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonaToShip" ADD CONSTRAINT "_PersonaToShip_B_fkey" FOREIGN KEY ("B") REFERENCES "Ship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
