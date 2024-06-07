/*
  Warnings:

  - You are about to drop the column `init_1p_command` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `init_2p_command` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "init_1p_command",
DROP COLUMN "init_2p_command";
