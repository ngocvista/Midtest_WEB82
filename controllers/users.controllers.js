import { createUserDB, getUserDB, getUserById } from "../models/users.models.js"
import bcrypt from 'bcrypt'
import { createSession, getSession } from "../models/sessions.models.js";
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        //check trùng email
        const emailDuplicate = await getUserDB({ email })
        //trùng = lỗi
        if (emailDuplicate.length) throw new Error('Email is exist!')
        // Validate field
        //hashing password
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt)
        // Tạo user mới vào database
        const newUser = { username, email, password: hashPassword }
        const createUser = await createUserDB(newUser)
        res.status(201).send({
            message: 'Created',
            user: createUser
        })
        // Trả về kq
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    //lấy thông tin user
    const { username, password } = req.body
    try {
        // ktra username có đúng k
        const checkUser = await getUserDB({username})
        // k đúng báo lỗi tài khoản k tồn tại
        if (!checkUser) throw new Error('User not found!')
        
        // Ktra mk xem đúng k
        const checkPassword = bcrypt.compareSync(password, checkUser[0].password)
        // báo lỗi
        if (!checkPassword) throw new Error('Password is incorrect!')
        
        const checkSession = await getSession({ username:username })
        console.log(checkSession)
        const randomString = uuidv4().replaceAll('-', '')
        const apiKey = `mern-$${checkUser[0]._id}$-$${checkUser[0].email}$-$${randomString}$`
        if (!checkSession) {
            //nếu chưa có
            const newSession = {
                username,
                key: randomString,
            }
            await createSession(newSession)
        } else {
            //nếu có rồi
            checkSession.key = randomString
            checkSession.save()
        }

        // Báo thành công
        res.status(200).send({
            message: 'Login success',
            apiKey,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

