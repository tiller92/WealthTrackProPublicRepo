import prisma from "../../lib/prismaExport"

export default async function handler(req, res) {

    const info = req.body
    console.log(info.username, 'deleter')

    async function main() {
        const deleteUser = await prisma.User.delete({
            where: {
                username: info.username,

            },
        })

    }
    const del = await main()
    res.status(202).json({ data: 'req works' }, 'user deleted')
}