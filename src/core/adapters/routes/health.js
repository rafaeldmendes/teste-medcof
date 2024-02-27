export function health(router, db){
    const app = router()
    app.get("/health", (req,res) => res.json({status:"ok"}))

    return app
}