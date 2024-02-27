import {health} from "../core/adapters/routes/health.js"
import router from "../infrastructure/RouterInstance.js"
export default (app, {db}) => {
    app.use("/",health(router, db))
}