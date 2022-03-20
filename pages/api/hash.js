// this check the db for user and return user json
import axios from 'axios'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SECRET_KEY from '/Users/ryantiller/Documents/wealth-trac-proto/wealth-trac-proto/config'
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
    try {
        const info = req.body
        async function main() {
            // info from login page
            const username = info['username']
                // get that users info from db with this
            const db_user = await getUser(username)

            const token = await jwt.sign({
                data: {...db_user }
            }, SECRET_KEY.module, { expiresIn: '1h' });

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
    } catch (err) {
        res.status(403).json('err')
    }
}

// jwt.sign({
//     data: 'foobar'
//   }, 'secret', { expiresIn: '1h' });