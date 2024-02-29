import verifyToken from "../middlewares/verifyToken.js"

export default function health(router, db) {
    const app = router()
    app.get("/health",  verifyToken, (req, res) => res.json({ status: "ok" }))

    return app
}