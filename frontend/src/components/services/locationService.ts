import {Locaciones} from "../models/locaciones.ts";
import api from "../utils/HttpInterceptor.ts";

export const listarLocaciones = async (): Promise<Locaciones[]> => {
    const resp = await api.get(`/locaciones/listar`);
    return resp.data;
};