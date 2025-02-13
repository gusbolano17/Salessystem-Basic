import express from "express";
import {usuarioController} from "./controller/usuario-controller";
import {connectDb} from "./config/database-config";
import dotenv from "dotenv";
import {clienteController} from "./controller/clientes-controller";
import {proveedorController} from "./controller/proveedores-controller";
import {productoController} from "./controller/productos-controller";
import cors from "cors";
import {locacionController} from "./controller/locacion-controller";

dotenv.config();

const app: express.Application = express();
const port: number = 3000;

connectDb().then(r => {
    console.log("Conectado a la base de datos...");
});

app.use(cors())
app.use(express.json());
app.use("/api/auth",usuarioController);
app.use("/api/clientes", clienteController);
app.use("/api/proveedores", proveedorController);
app.use("/api/productos", productoController);
app.use("/api/locaciones", locacionController);

app.listen(port, (): void => {
    console.log(`Server running on http://localhost:${port}`);
});
