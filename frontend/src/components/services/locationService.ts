import axios from "axios";
import {Locaciones} from "../models/locaciones.ts";
import {HttpHeader} from "../utils/httpHeaders.ts";

const URL : string = "http://localhost:3000/api";

export const listarLocaciones = async (): Promise<Locaciones[]> => {
    const resp = await axios.get(`${URL}/locaciones/listar`, {
        headers : HttpHeader
    });
    return resp.data;
};