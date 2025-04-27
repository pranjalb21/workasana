import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing." });
    }

    const authParts = authHeader.split(" ");
    if (authParts[0] !== "Bearer" || authParts.length !== 2) {
        return res
            .status(401)
            .json({ error: "Authorization header format mismatch." });
    }
    const token = authParts[1];
    if (!token) {
        return res.status(401).json({ error: "Authorization token missing." });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ error: "JWT secret is not defined." });
    }

    // console.log(secret);

    try {
        const decodedToken = jwt.verify(token, secret);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ error: "Invalid token.", msg: error.message });
    }
};
export default verifyJwt;
