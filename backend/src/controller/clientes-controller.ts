import {  Router, Request, Response  } from "express";
import Cliente from "../models/clientes";
import {protectRouter} from "../config/jwtProtectRoutes";

export const clienteController = Router();

clienteController.use(protectRouter);

clienteController.get("/listar",async (req: Request, res: Response) => {
    try {
        const listaClientes = await Cliente.find();
        res.status(200).json(listaClientes);
    } catch (error) {
        res.status(500).json({ error: "Error al listar clientes" });
    }
});

clienteController.get("/obtener/:id",async (req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const cliente = await Cliente.findById(id);
        res.status(200).json(cliente);
    }catch (err) {
        res.status(500).json({ error: "Error al obtener el cliente" });
    }
});

clienteController.post("/crear",async (req: Request, res: Response) => {
    try{
        const cliente = new Cliente(req.body);
        cliente.estado = "ACTIVO";
        await cliente.save();
        res.status(201).json({msg: "Cliente creado correctamente"});
    }catch (err) {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
});

clienteController.get("/listar/fechas/:fecha",async (req: Request, res: Response) => {
    try{
        const fechaInicio = new Date(req.params.fecha);
        const fechaFin = new Date();

        const listaClientes = await Cliente.find({
            fechaCreacion:{$gte:fechaInicio,$lt: fechaFin}
        });
        res.status(200).json(listaClientes);
    }catch (err) {
        res.status(500).json({ error: "Error al listar los clientes por fecha" });
    }
});

// clienteController.put("/editar/:id",async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const cliente = await Cliente.findOneAndUpdate({id}, req.body);
//
// })