import { parseBody } from "next/dist/server/api-utils"

import prisma from "../../lib/prismaExport"


export default function handler(req, res) {
    const { username } = req.body
    async function main() {
        // ... you will write your Prisma Client queries here
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        })
        console.log(user)
        return user
    }

    const user = main()
        .catch((e) => {
            throw e
        })
        .finally(async() => {
            await prisma.$disconnect()
        })
    res.status(200).json(user)
}