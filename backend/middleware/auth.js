const jwt = require("jsonwebtoken");

const JWT_SECRET = "hospital_secret_key_2024";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

const generateToken = (id, role, email) => {
    return jwt.sign({ id, role, email }, JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { authMiddleware, generateToken, JWT_SECRET };
