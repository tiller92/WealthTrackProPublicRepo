import prisma from "../../lib/prismaExport"
import bcrypt from 'bcryptjs'


export default async function handler(req, res) {

    const userInfo = req.body
    if (!userInfo.newUsername) {
        userInfo.newUsername = userInfo.currentUserName
    }
    if (!userInfo.newPassword) {
        userInfo.newPassword = userInfo.currentPassword
    }
    const hashPWD = await bcrypt.hash(userInfo.newPassword, 12)
    async function updateUser() {
        const data = await prisma.User.update({
            where: {
                username: userInfo.currentUserName,
            },
            data: {
                username: userInfo.newUsername,
                password: hashPWD,
            },
        })

        return true
    }
    try {
        const info = updateUser()
        return res.status(201).json('User Information updated')
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

// } catch (err) {
//   console.log(err)
//   return res.status(400).json(err)
// } finally {
//   return await res.status(201).json('finally')
// }