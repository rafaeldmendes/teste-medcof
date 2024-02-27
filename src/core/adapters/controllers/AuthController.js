import Auth from '../../usecases/Auth'

export default class AuthController {
    constructor() {
        this.auth = new Auth()
    }
    async login(req, res) {
        
        const result = await this.auth.login(req.body)
        return res.code(result.code).send(result)
    }
}