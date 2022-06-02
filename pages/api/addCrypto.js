import prisma from "../../lib/prismaExport"


export default async function handler(req, res) {

    const new_stock = req.body

    async function main() {
        const userstock = await prisma.Usercrypto.create({
            data: {
                name: new_stock.name,
                shares: parseFloat(new_stock.shares),
                owner: { connect: { username: new_stock.username } }
            }
        })
        console.log(userstock, ' this is user stock')
    }
    const crypto = await main()
    res.status(201).json({ crypto: crypto }, 'add crypto test')
}