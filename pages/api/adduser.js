import prisma from "../../lib/prismaExport"
import bcrypt from 'bcryptjs'


export default async function handler(req, res) {
    const { first_name, last_name, username, email, password,date } = req.body
    const hashPWD = await bcrypt.hash(password, 12)
    const user = await prisma.User.create({
        data: {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashPWD,
            date:date,
        },

    })
    return res.status(200).json({ data: user })

}