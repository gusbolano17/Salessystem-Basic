import {Router ,Request, Response } from "express";
import Usuario from "../models/usuario";
import {generateToken} from "../config/jwtConfig";

export const usuarioController = Router();

usuarioController.post("/register", async (req: Request, res: Response) => {

    try {
        const {nombre, usuario, password} = req.body;

        const usuarioExist = await Usuario.findOne({usuario});

        if (usuarioExist) {
            res.status(400).json({msg : "El usuario ya existe"});
        }

        const usuarioNuevo = new Usuario({nombre, usuario, password});
        await usuarioNuevo.save();

        const token = generateToken({nombre, usuario});

        res.status(201).json({msg:"Usuario creado exitosamente", token});

    }catch(err){
        res.status(500).json({msg: "Error al crear el usuario"})
    }

});

usuarioController.post("/login", async (req: Request, res: Response) => {
    const {usuario, password} = req.body;

    const usuarioExist = await Usuario.findOne({usuario});

    if(!usuarioExist || !(await usuarioExist.comparePass(password))) {
        res.status(401).json({msg: "Credenciales incorrectas"});
    }

    const token = generateToken({username : usuarioExist?.usuario});

    res.status(200).json({token});
})