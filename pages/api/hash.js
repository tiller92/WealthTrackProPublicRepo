// this check the db for user and return user json
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../secret'
import prisma from '../../lib/prismaExport'

async function getUser(username) {
    // get the user
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
    if (!user) {
        throw console.error('no user found error hash.js')
    }
    return user
}

export default async function handler(req, res) {

    console.log(SECRET_KEY)
    const info = req.body
    async function main() {
        // info from login page
        const username = info['username']
            // get that users info from db with this
        const db_user = await getUser(username)

        const token = await jwt.sign({
            data: {...db_user }
        }, SECRET_KEY, { expiresIn: '1h' });

        const user = {
            user: {...db_user },
            token: token
        }
        const JSON_user = JSON.stringify(user)
        return JSON_user
    }
    const check = await main()
        .catch((e) => {
            throw e
        })
        .finally(async() => {
            await prisma.$disconnect()
        })

    // get this to return user data
    res.status(200).json({ check: check })

}