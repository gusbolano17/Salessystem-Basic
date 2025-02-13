import {Request, Response, NextFunction} from "express";
import {verifyToken} from "./jwtConfig";

export const protectRouter = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
    }

    try {
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ error: "Error al verificar el token" });
    }
};
