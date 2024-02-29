import health from "../core/adapters/routes/health.js"
import auth from "../core/adapters/routes/auth.js"
import users from "../core/adapters/routes/users.js"

import router from "../infrastructure/RouterInstance.js"
export default (app, { db }) => {
    app.use("/", health(router, db))
    app.use("/auth", auth(router, db))
    app.use("/users", users(router, db))
}