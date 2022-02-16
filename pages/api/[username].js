import { parseBody } from "next/dist/server/api-utils"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




export default function handler(req, res) {
    const { username } = req.query
    let obj = {}
    async function main() {
        // ... you will write your Prisma Client queries here
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
            include: {
                stocks: true,
            }
        })

        console.log(user, 'api')
        return res.status(200).json(user)
    }
    return main()
}