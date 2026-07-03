import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing",
            });
        }

        const token = authHeader.split(" ")[1];

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default isAuth;