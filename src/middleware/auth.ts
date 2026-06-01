import jwt from 'jsonwebtoken';

export const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded: any = jwt.verify(token, process.env.SECRET as string);
        req.userId = decoded.id;
        req.userEmail = decoded.email;

        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};