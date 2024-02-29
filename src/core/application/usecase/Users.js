import bcrypt from 'bcrypt'
import UsersModel from '../../domain/models/UsersModel.js'

export default class Users {
    constructor(database = {}) {
        this.usersModel = new UsersModel(database)
    }
    async createUser(obj) {
        try {
            const data = {
                name: obj.name,
                username: obj.username,
                password: await bcrypt.hash(obj.password, 10)
            }
            const result = await this.usersModel.createUser(data)
            if (!result?.[0]?.id)
                return { code: 500, status: "error", message: "Error on create " }

            return { code: 200, status: "success", data: { username: obj.username, id: result[0].id } }
        } catch (err) {
            console.log("Error on create user => ", err)
            return { code: 400, status: "error", message: err.message }
        }
    }

    async getUser(id) {
        try {
            if (!id || typeof id !== "number")
                return { code: 400, status: "error", message: "id is required" }

            const result = await this.usersModel.getUser(id)
            if (!result?.length)
                return { code: 404, status: "error", message: "User not found" }

            return { code: 200, status: "success", data: result[0] }
        } catch (err) {
            console.log("Error on get user => ", err)
            return { code: 400, status: "error", message: err.message }
        }
    }
}