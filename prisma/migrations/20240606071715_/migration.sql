/*
  Warnings:

  - Made the column `user_game_command` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_game_command" SET NOT NULL;
