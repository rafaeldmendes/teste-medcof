import server from "../infrastructure/ServerInstance.js"
import cors from "../infrastructure/CorsInstance.js"
import db from "../infrastructure/DatabaseInstance.js"
import routes from "./routes.js"

export default server(process.env.PORT, cors, routes,{db:db })