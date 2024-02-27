import AuthModel from '../../domain/models/AuthModel.js'

export default class Auth {
    constructor() {
        this.authModel = new AuthModel()
    }
    async login({ username, password }) {
        if (!username || !password) {
            return { code: 400, status: "error", message: "username and password is required" }
        }

        const user = await this.authModel.getUser(username)
        if (!user?.token) {
            return { code: 400, status: "error", message: "user not found" }
        }
        return { code: 200, status: "success", data: user.token }
    }
}