import {model, Schema, Document} from "mongoose";

interface IProveedor extends Document{
    nombre: string;
    telefono: string;
    email: string;
    direccion: string;
    productos : Schema.Types.ObjectId[];
    nit : string;
    fechaCreacion : Date;
    fechaModificacion : Date;
    estado : string;
}

const proveedorSchema : Schema<IProveedor> = new Schema({
    nombre: {type:String, required:true},
    telefono: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    direccion: {type:String, required:true},
    nit : {type:String, required:true, unique:true},
    productos : [{type: Schema.Types.ObjectId, ref: "Productos"}],
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
    estado : {type:String, required:true, default : "ACTIVO"},
});

export default model<IProveedor>("proveedor",proveedorSchema);