import {Cliente} from "../models/cliente-model.ts";
import api from "../utils/HttpInterceptor.ts";

export const listarClientes = async (): Promise<Cliente[]> => {
    const dataResp = await api.get(`/clientes/listar`);
    return dataResp.data;
}

export const listarClientesNombre = async (nombre : string): Promise<Cliente[]> => {
    const dataResp = await api.get(`/clientes/listar/nombre/${nombre}`)
    return dataResp.data;
}

export const obtenerClientDocumento = async (td : string, doc : string): Promise<Cliente[]> => {
    const dataResp = await api.get(`/clientes/obtener/documento/${td}/${doc}`)
    return dataResp.data;
}

export const listarClientesFecha = async (fecha : string): Promise<Cliente[]> => {
    const dataResp = await api.get(`/clientes/listar/fechas/${fecha}`)
    return dataResp.data;
}

export const agregarCliente = async (body : Cliente) : Promise<any> => {
    const dataResp = await api.post(`/clientes/crear`, body);
    return dataResp.data;
}

export const editarCliente = async (id : string ,body : Cliente) : Promise<any> => {
    const dataResp = await api.put(`/clientes/editar/${id}`, body);
    return dataResp.data;
}