import prisma from "../../lib/prismaExport"

export default async function handler(req, res) {

    const new_stock = req.body
    console.log(new_stock.ticker)

    async function main() {
        const userstock = await prisma.Userstocks.create({
            data: {
                ticker: new_stock.ticker,
                shares: parseFloat(new_stock.shares),
                owner: { connect: { username: new_stock.username } }
            }
        })
    }
    const stock = await main()
    res.status(201).json({ stock: stock }, 'add stock test')
}