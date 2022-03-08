import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {

    const new_stock = req.body
    console.log(new_stock.ticker)

    async function main() {
        const userstock = await prisma.Usercrypto.create({
            data: {
                name: new_stock.name,
                shares: parseFloat(new_stock.shares),
                owner: { connect: { username: new_stock.username } }
            }
        })
    }
    const crypto = await main()
    res.status(201).json({ crypto: crypto }, 'add crypto test')
}