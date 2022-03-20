import { parseBody } from "next/dist/server/api-utils"
import prisma from "../../lib/prismaExport"

export default function handler(req, res) {

    async function main() {
        // ... you will write your Prisma Client queries here
        const allUsers = await prisma.user.findMany()
        console.log(allUsers)
        return allUsers
    }

    const users = main()
        .catch((e) => {
            throw e
        })
        .finally(async() => {
            await prisma.$disconnect()
        })
    res.status(200).json({ users })
}