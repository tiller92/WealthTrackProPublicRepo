import { parseBody } from "next/dist/server/api-utils"
import prisma from "../../lib/prismaExport"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SECRET_KEY from '/Users/ryantiller/Documents/wealth-trac-proto/wealth-trac-proto/config'
import { setHttpAgentOptions } from "next/dist/server/config"


const shh = SECRET_KEY.module



export default function handler(req, res) {
    console.log(req.method)
    const { first_name, last_name, username, email, password } = req.body
    async function main() {
        const hashPWD = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: hashPWD,
            },

        })
        const json_user = user
        return json_user
    }

    const newUser = main()
        .catch((e) => {
            throw e
        })
        .finally(async() => {
            await prisma.$disconnect()
        })
    res.status(200).json({ data: 'new user created' })

}


// {
//     decode: [Function (anonymous)],
//     verify: [Function (anonymous)],
//     sign: [Function (anonymous)],
//     JsonWebTokenError: [Function: JsonWebTokenError],
//     NotBeforeError: [Function: NotBeforeError],
//     TokenExpiredError: [Function: TokenExpiredError]
//   }