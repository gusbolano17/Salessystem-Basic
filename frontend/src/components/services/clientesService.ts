import axios from "axios";
import {Cliente} from "../models/cliente-model.ts";
import {HttpHeader} from "../utils/httpHeaders.ts";

const URL : string = "http://localhost:3000/api";

export const listarClientes = async (): Promise<Cliente[]> => {
    const dataResp = await axios.get(`${URL}/clientes/listar`, {
        headers : HttpHeader()
    });
    return dataResp.data;
}

export const listarClientesNombre = async (nombre : string): Promise<Cliente[]> => {
    const dataResp = await axios.get(`${URL}/clientes/listar/nombre/${nombre}`, {
        headers : HttpHeader()
    })
    return dataResp.data;
}

export const obtenerClientDocumento = async (td : string, doc : string): Promise<Cliente[]> => {
    const dataResp = await axios.get(`${URL}/clientes/obtener/documento/${td}/${doc}`, {
        headers : HttpHeader()
    })
    return dataResp.data;
}

export const listarClientesFecha = async (fecha : string): Promise<Cliente[]> => {
    const dataResp = await axios.get(`${URL}/clientes/listar/fechas/${fecha}`, {
        headers : HttpHeader()
    })
    return dataResp.data;
}

export const agregarCliente = async (body : Cliente) : Promise<any> => {
    const dataResp = await axios.post(`${URL}/clientes/crear`, body, {
        headers : HttpHeader()
    });
    return dataResp.data;
}