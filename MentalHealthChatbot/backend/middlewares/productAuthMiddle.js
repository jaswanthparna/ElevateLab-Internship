import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized - No token provided",
            success: false,
            error: true
        });
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token format",
            success: false,
            error: true
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // You can access this in your routes as req.user
        next();
    } catch (error) {
        console.log("JWT error:", error);
        return res.status(401).json({
            message: "Unauthorized - Invalid or expired token",
            success: false,
            error: true
        });
    }
};
