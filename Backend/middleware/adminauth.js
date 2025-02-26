import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

        console.log("Received Token:", token);

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if decoded email matches admin email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Proceed to next middleware
        next();
    } catch (err) {
        console.log("JWT Error:", err);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default adminAuth;
