import express from "express";
import bodyParser from "body-parser";

export default function server(port, cors, routes, connections) {
    const app = express();
    app.use(cors())
    app.use(bodyParser.json({ limit: '256mb' }))
    routes(app, connections)

    app.listen(port, () => console.log("Server running on port:", port))

    return app;

}
