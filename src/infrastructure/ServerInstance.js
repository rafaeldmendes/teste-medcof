import express from "express";

export default function server(port, cors, routes, connections) {
    const app = express();
    app.use(cors())
    routes(app, connections)

    app.listen(port, () => console.log("Server running on port:", port))

    return app;

}
