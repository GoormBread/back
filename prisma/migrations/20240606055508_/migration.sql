/*
  Warnings:

  - The `init_1p_command` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `init_2p_command` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "init_1p_command",
ADD COLUMN     "init_1p_command" TEXT[],
DROP COLUMN "init_2p_command",
ADD COLUMN     "init_2p_command" TEXT[];
