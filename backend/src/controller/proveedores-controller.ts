import {  Router, Request, Response  } from "express";
import Proveedor from "../models/proveedor";
import {protectRouter} from "../config/jwtProtectRoutes";

export const proveedorController = Router();

proveedorController.use(protectRouter);

proveedorController.get("/listar", async (req: Request, res: Response) => {
    try {
        const proveedores = await Proveedor.find().populate("productos");
        res.status(200).json(proveedores);
    }catch(err){
        res.status(500).json({msg:"Error al listar proveedores"});
    }
});

proveedorController.get("/obtener/:id",async (req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const proveedor = await Proveedor.findById(id).populate("productos");
        res.status(200).json(proveedor);
    }catch (err) {
        res.status(500).json({ error: "Error al obtener el proveedor" });
    }
});

proveedorController.post("/crear",async (req: Request, res: Response) => {
    try{
        const proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.status(201).json({msg: "Proveedor creado correctamente", proveedor});
    }catch (err) {
        res.status(500).json({ error: "Error al crear el proveedor" });
    }
});