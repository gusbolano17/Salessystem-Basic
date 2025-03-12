import {Cliente} from "../models/cliente-model.ts";
import {Proveedor} from "../models/proveedor-model.ts";

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

export const proveedorForTables = (pr : Proveedor[]) => {
    return pr.map((row) => {
        return {
            "Nombre" : row.nombre,
            "NIT" : row.nit,
            "Estado" : row.estado
        }
    })
}