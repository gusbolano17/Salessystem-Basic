import {Proveedor} from "../models/proveedor-model.ts";
import {agregarProducto} from "./productosService.ts";
import {Producto} from "../models/producto-model.ts";
import api from "../utils/HttpInterceptor.ts";

export const listarProveedores = async () => {
    const resp = await api.get(`/proveedores/listar`);
    return resp.data;
}

export const agregarProveedor = async (body : Proveedor) : Promise<any> => {
    const dataResp = await api.post(`/proveedores/crear`, body);
    return dataResp.data;
}

export const crearProveedorProductos = async (proveedor : Proveedor, productos : Producto[]) : Promise<any> => {
   try {
       const proveedorId = await agregarProveedor(proveedor);
       if(proveedorId){
           const provprod = productos.map(pr => ({
               ...pr,
               proveedorId : proveedorId.proveedor
           }));
           provprod.forEach(producto => {
               agregarProducto(producto);
           })
       }
       return {msg : "Proveedor ingresado exitosamente"}
   }catch(err){
       return {msg : err};
   }

}