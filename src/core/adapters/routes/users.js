import UsersController from "../controllers/UsersController.js"
import verifyToken from "../middlewares/verifyToken.js"

export default function users(router, db) {
    const usersController = new UsersController(db)

    const app = router()
    app.post("/", verifyToken, (req, res) => usersController.createUser(req, res))

    return app
}