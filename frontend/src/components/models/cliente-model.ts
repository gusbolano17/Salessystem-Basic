import {Locaciones} from "./locaciones.ts";

export interface Cliente{
    _id?: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    documento: string;
    tipoDocumento: string;
    tipoPersona: string;
    locacion: Locaciones;
}