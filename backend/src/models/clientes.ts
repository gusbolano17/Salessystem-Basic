import {Schema, model, Document} from "mongoose";
import {Locacion, locacionSchema} from "./locacion";

interface ICliente extends Document{
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    documento: string;
    tipoDocumento: string;
    tipoPersona: string;
    estado: string;
    locacion: Locacion;
    fechaCreacion: Date;
    fechaModificacion: Date;
}

const clienteSchema: Schema<ICliente> = new Schema({
    nombres: {type:String, required:true},
    apellidos: {type:String},
    email: {type:String, required:true, unique:true},
    telefono: {type:String},
    direccion: {type:String},
    documento: {type:String, required:true},
    tipoDocumento: {type:String, required:true},
    tipoPersona: {type:String, required:true},
    estado: {type:String, required:true, default : "ACTIVO"},
    locacion : { type: locacionSchema},
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
});

export default model<ICliente>("Clientes", clienteSchema);