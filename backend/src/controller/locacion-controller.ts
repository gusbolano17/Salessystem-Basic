import {Router, Request, Response} from 'express';
import {protectRouter} from "../config/jwtProtectRoutes";
import Locacion from "../models/locacion";

export const locacionController = Router();
// locacionController.use(protectRouter);

locacionController.get("/listar", async (req: Request, res: Response) => {
    try {
        const listaLocaciones = await Locacion.find();
        res.status(200).json(listaLocaciones);
    }catch(err) {
        res.status(500).json(err);
    }
});