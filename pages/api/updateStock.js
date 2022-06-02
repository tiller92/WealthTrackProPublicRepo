import prisma from "../../lib/prismaExport"


export default async function handler(req, res) {

    const info = req.body

    async function main() {
        const deleteUser = await prisma.Userstocks.update({
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