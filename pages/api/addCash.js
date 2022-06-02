import prisma from "../../lib/prismaExport"


export default async function handler(req, res) {

    const new_stock = req.body
    async function main() {
        const userCash = await prisma.Usercash.create({
            data: {
                amount: parseFloat(new_stock.amount),
                owner: { connect: { username: new_stock.username } }
            }
        })
    }
    const debt = await main()
    res.status(201).json({ data: debt }, 'add debt test')
}