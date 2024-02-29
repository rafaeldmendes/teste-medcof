export default class AuthModel {
    constructor(database) {
        this.database = database
    }
    async getUser(username) {
        return await this.database("users").where({username}) 
    }
}