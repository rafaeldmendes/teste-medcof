import AuthController from "../controllers/AuthController.js"

export default function auth(router, db){
    const authController = new AuthController(db)

    const app = router()
    app.post("/login", (req,res) => authController.login(req,res))

    return app
}