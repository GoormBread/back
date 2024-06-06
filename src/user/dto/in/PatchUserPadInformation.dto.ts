import { Prisma } from "@prisma/client"

export type PatchUserPadInformationDto = {
    userGameCommand: Prisma.InputJsonObject;
}