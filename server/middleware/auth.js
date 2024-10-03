import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userid = decodedData?.id;
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(401).json({ message: "Authentication failed." });
    }
};

export default auth;
