import prisma from "../../lib/prismaExport"

export default async function handler(req, res) {

    const info = req.body
    console.log(info, 'realestate')

    async function main() {
        const deleteUser = await prisma.userdebt.update({
            where: {
                id: info.id,
            },
            data: {
                debt: parseFloat(info.value),
                type: info.name,
                interest: info.interest
            }
        })
        console.log(deleteUser)
    }
    const del = await main()
    res.status(204).json({ data: info }, 'update realestate')
}