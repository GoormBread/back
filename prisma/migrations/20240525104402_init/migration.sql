-- CreateTable
CREATE TABLE "Game" (
    "game_id" TEXT NOT NULL,
    "player_num" INTEGER NOT NULL,
    "game_name" TEXT NOT NULL,
    "game_info" TEXT NOT NULL,
    "game_command" JSONB NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "user_game_command" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
