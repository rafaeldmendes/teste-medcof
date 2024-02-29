import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        const policy = accessPolicy(req.originalUrl, req.method)
        if (policy.root && !decoded.root) return res.status(403).json({ error: 'Access denied' })

        next();
    } catch (error) {
        console.log(error)
        if (error.message === "jwt expired") {
            return res.status(401).json({ error: 'Sessão expirada' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};

function accessPolicy(url, method) {
    const policies = {
        "GET:/health": { root: false },
        "POST:/users": { root: true },
    }

    return policies[`${method}:${url}`]
}
