import { jest } from '@jest/globals';

import AuthModel from "../../core/domain/models/AuthModel";
import Auth from "../../core/application/usecase/Auth.js"

jest.mock("../../core/domain/models/AuthModel");


// beforeEach(() => {
//     AuthModel.mockClear();
// });

describe("Test auth", () => {

   

    it("Test login success", async () => {
        const auth = new Auth()
        const response = await auth.login({ username: "admin", password: "admin" })
        console.log(response)
        expect(response.code).toBe(200)
        expect(response.status).toBe("success")
        expect(response.data).toBeDefined()
        expect(response.data).hasOwnProperty("token")
    })

    it("Test login insuccess - missing password", async () => {
        const auth = new Auth()
        const response = await auth.login({ username: "admin" })
        expect(response.code).toBe(400)
        expect(response.status).toBe("error")
        expect(response.message).toBe("username and password is required")
    })

    it("Test login insuccess - missing username", async () => {
        const auth = new Auth()
        const response = await auth.login({  password: "password" })
        expect(response.code).toBe(400)
        expect(response.status).toBe("error")
        expect(response.message).toBe("username and password is required")
    })
})