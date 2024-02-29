import Users from "../../application/usecase/Users.js"

export default class UsersController {
    constructor(database = {}) {
        this.users = new Users(database)
    }

    async getAllUsers(req, res) {

        const user = await this.users.getUser(req.userId)
        if (user.code != 200) {
            return res.status(user.code).send(user)
        }

        const result = await this.users.allUsers()
        return res.status(result.code).send(result)
    }

    async createUser(req, res) {

        const user = await this.users.getUser(req.userId)
        if (user.code != 200) {
            return res.status(user.code).send(user)
        }

        const validate = this.validateUser(req)
        if (validate.code !== 200) {
            return res.status(validate.code).send(validate)
        }

        const result = await this.users.createUser(req.body)
        return res.status(result.code).send(result)
    }

    validateUser(req) {
        let obj = {
            code: 400, status: "error", message: ""
        }
        if (!req.body.name)
            obj.message = "name is required"

        if (!req.body.username)
            obj.message = "username is required"

        if (!req.body.password)
            obj.message = "password is required"

        if (obj.message.length) {
            return obj
        } else {
            return { code: 200, status: "success", message: "Body valid with success!" }
        }

    }
}