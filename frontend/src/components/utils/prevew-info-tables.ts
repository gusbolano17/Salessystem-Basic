import {Cliente} from "../models/cliente-model.ts";

export const clientesForTables = (cl : Cliente[]) => {
    return cl.map((row) => {
        return {
            "Nombres" : row.nombres,
            "Apellidos" : row.apellidos,
            "Estado" : row.estado,
            "Tipo documento" : row.tipoDocumento,
            "Documento" : row.documento
        }
    })
}