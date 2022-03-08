import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {

    const new_stock = req.body
    console.log(new_stock)

    async function main() {
        const userdebt = await prisma.Userdebt.create({
            data: {
                type: new_stock.type,
                debt: parseFloat(new_stock.debt),
                interest: parseFloat(new_stock.interest),
                owner: { connect: { username: new_stock.username } }
            }
        })
    }
    const debt = await main()
    res.status(201).json({ data: debt }, 'add debt test')
}