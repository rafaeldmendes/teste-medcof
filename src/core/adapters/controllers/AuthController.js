import Auth from '../../application/usecase/Auth.js'

export default class AuthController {
    constructor(database = {}) {
        this.auth = new Auth(database)

    }
    async login(req, res) {

        if (!req.body) {
            return res.status(400).send({ code: 400, status: "error", message: "username and password is required" })
        }

        const result = await this.auth.login(req.body)
        return res.status(result.code).send(result)
    }
}