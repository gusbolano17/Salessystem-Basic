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
        await cliente.save();
        res.status(201).json({msg: "Cliente creado correctamente"});
    }catch (err) {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
});

clienteController.get("/listar/nombre/:nombre",async (req: Request, res: Response) => {
    try {
        const nombre = req.params.nombre;
        const clientes = await Cliente.find({nombres : {$regex: nombre, $options: "i"}});
        res.status(200).json(clientes);
    }catch (err) {
        res.status(500).json({ error: "Error listar los clientes" });
    }

})

clienteController.get("/obtener/documento/:td/:doc",async (req: Request, res: Response) => {
    try {
        const td = req.params.td;
        const doc = req.params.doc;
        const clientes = await Cliente.find({tipoDocumento : td ,documento : doc});
        res.status(200).json(clientes);
    }catch (err) {
        res.status(500).json({ error: "Error listar los clientes" });
    }
})

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

clienteController.put("/editar/:id",async (req: Request, res: Response) => {

    try {
        const {id} = req.params;
        const body = req.body;

        await Cliente.findOneAndUpdate({_id: id}, {$set: body}, {new: true});

        res.status(201).json({msg: "Cliente editado correctamente"});
    }catch (err) {
        res.status(500).json({ error: "Error al editar el cliente" });
    }
});