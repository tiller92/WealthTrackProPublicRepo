import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {

    const info = req.body
    console.log(info, 'crypto')

    async function main() {
        const deleteUser = await prisma.Usercrypto.update({
            where: {
                id: info.id,
            },
            data: {
                shares: parseFloat(info.shares)
            }
        })
        console.log(deleteUser)
    }
    const del = await main()
    res.status(204).json({ data: info }, 'update test')
}