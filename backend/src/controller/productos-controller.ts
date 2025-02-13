import {  Router, Request, Response  } from "express";
import Productos from "../models/productos";
import Proveedor from "../models/proveedor";
import {protectRouter} from "../config/jwtProtectRoutes";

export const productoController = Router();

productoController.use(protectRouter);

productoController.get("/listar", async (req: Request, res: Response) => {
    try {
        const productos = await Productos.find();
        res.status(200).json(productos);
    }catch(err){
        res.status(500).json({msg:"Error al listar productos"});
    }
});

productoController.get("/obtener/:id",async (req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const producto = await Productos.findById(id);
        res.status(200).json(producto);
    }catch (err) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

productoController.post("/crear",async (req: Request, res: Response) => {
    try{
        const producto = new Productos(req.body);
        await producto.save();

        await Proveedor.findByIdAndUpdate(producto.proveedorId,{
            $push : {productos: producto._id}
        });

        res.status(201).json({msg: "Producto creado correctamente"});
    }catch (err) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
});