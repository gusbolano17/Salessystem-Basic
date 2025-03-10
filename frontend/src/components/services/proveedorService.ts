import {HttpHeader} from "../utils/httpHeaders.ts";
import axios from "axios";
import {Proveedor} from "../models/proveedor-model.ts";

const URL : string = "http://localhost:3000/api";

export const listarProveedores = async () => {
    const resp = await axios.get(`${URL}/proveedores/listar`, {
        headers : HttpHeader()
    });
    return resp.data;
}

export const agregarProveedor = async (body : Proveedor) : Promise<any> => {
    const dataResp = await axios.post(`${URL}/proveedores/crear`, body, {
        headers : HttpHeader()
    });
    return dataResp.data;
}