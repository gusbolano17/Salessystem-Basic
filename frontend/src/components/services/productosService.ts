import {Producto} from "../models/producto-model.ts";
import api from "../utils/HttpInterceptor.ts";

export const listarProductos = async () : Promise<Producto[]> => {
    const resp = await api.get(`/productos/listar`);
    return resp.data;
}

export const agregarProducto = async (producto: Producto) : Promise<any> => {
    const resp = await api.post(`/productos/crear`, producto );
    return resp.data;
}