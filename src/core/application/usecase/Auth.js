import AuthModel from '../../domain/models/AuthModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default class Auth {
    constructor(database = {}) {
        this.authModel = new AuthModel(database)
    }
    async login({ username, password }) {
        try {
            if (!username || !password) {
                return { code: 400, status: "error", message: "username and password is required" }
            }

            const user = await this.authModel.getUser(username)
            if (!user?.length) {
                return { code: 404, status: "error", message: "User not found" }
            }
            
            const passwordMatch = await bcrypt.compare(password,  user[0].password);
            if (!passwordMatch) {
                return { code: 400, status: "error", message: "Password is wrong" }
            }
            const token = jwt.sign({ userId: user[0].id, root: user[0].root }, process.env.JWT_SECRET || new Date().toString(), { expiresIn: '1h' })
            return { code: 200, status: "success", data: token }
        } catch (err) {
            console.log(err)
            return { code: 500, status: "error", message: err.message }
        }
    }
}