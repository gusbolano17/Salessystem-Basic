import {Producto} from "./producto-model.ts";

export interface Proveedor{
    _id? : string;
    nombre: string;
    telefono: string;
    email: string;
    direccion: string;
    productos : Producto[];
    nit : string;
    estado : string;
}