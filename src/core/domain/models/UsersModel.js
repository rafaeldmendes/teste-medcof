export default class UserController {
    constructor(database = {}) {
        this.database = database
    }

    async createUser(obj) {
        try {
            return await this.database("users").insert(obj).returning('id')
        } catch (err) {
            console.log("Error on create user => ", err)
            return err
        }
    }

    async getUser(id) {
        try {
            return await this.database("users").where({ id })
        } catch (err) {
            console.log("Error on get user => ", err)
            return err
        }
    }

    async getAllUsers() {
        try {
            return await this.database("users").select(["id", "name","username","active","root","created_at"])
        } catch (err) {
            console.log("Error on get all user => ", err)
            return err
        }
    }
}