/*
  Warnings:

  - Added the required column `init_1p_command` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `init_2p_command` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "init_1p_command" TEXT NOT NULL,
ADD COLUMN     "init_2p_command" TEXT NOT NULL;
