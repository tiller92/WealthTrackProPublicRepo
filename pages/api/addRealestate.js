import prisma from "../../lib/prismaExport"


export default async function handler(req, res) {

    const new_real = req.body
    async function main() {
        const userreal = await prisma.Userrealestate.create({
            data: {
                name: new_real.name,
                value: parseFloat(new_real.value),
                owner: { connect: { username: new_real.username } }
            }
        })

    }

    const realestate = await main()
    res.status(201).json({ data: realestate }, 'add real test')
}