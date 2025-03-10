import {Proveedor} from "./proveedor-model.ts";

export interface Producto {
    _id?: string;
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    proveedorId: Proveedor;
}