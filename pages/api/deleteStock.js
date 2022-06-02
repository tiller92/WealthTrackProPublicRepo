import prisma from "../../lib/prismaExport"


export default async function handler(req, res) {

    const info = req.body

    async function main() {
        const deleteUser = await prisma.Userstocks.delete({
            where: {
                id: info.id,
            },
        })

    }
    const del = await main()
    res.status(204).json({ data: 'req works' }, 'add crypto test')
}