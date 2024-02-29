import { jest } from '@jest/globals';
import bcrypt from "bcrypt"

import Auth from "../../core/application/usecase/Auth.js"



describe("Test login function", () => {
    let connection, passwordHash
    const data = { username: "admin", password: "admin" }

    beforeAll(async () => {
        passwordHash = await bcrypt.hash(data.password, 10)

        connection = jest.fn().mockImplementation(() => {
            return {
                where: jest.fn().mockReturnValue([{ id: 1, username: "admin", password: passwordHash }])
            }
        })
    })

    it("Test login success", async () => {
        const auth = new Auth(connection)
        const response = await auth.login(data)
        expect(response.code).toBe(200)
        expect(response.status).toBe("success")
        expect(response.data).toBeDefined()
        expect(response.data).hasOwnProperty("token")
    })

    it("Test login insuccess - missing password", async () => {
        const auth = new Auth(connection)
        const response = await auth.login({ username: data.username })
        expect(response.code).toBe(400)
        expect(response.status).toBe("error")
    })

    it("Test login insuccess - missing username", async () => {

        const auth = new Auth(connection)
        const response = await auth.login({ password: passwordHash })
        expect(response.code).toBe(400)
        expect(response.status).toBe("error")
    })

    it("Test login insuccess - User not found", async () => {

        const auth = new Auth(connection)
        const response = await auth.login({ password: passwordHash })
        expect(response.code).toBe(400)
        expect(response.status).toBe("error")
    })
})