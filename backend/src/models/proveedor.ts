import {model, Schema, Document} from "mongoose";

interface IProveedor extends Document{
    nombre: string;
    telefono: string;
    email: string;
    direccion: string;
    productos : Schema.Types.ObjectId[];
    nit : string;
}

const proveedorSchema : Schema<IProveedor> = new Schema({
    nombre: {type:String, required:true},
    telefono: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    direccion: {type:String, required:true},
    nit : {type:String, required:true, unique:true},
    productos : [{type: Schema.Types.ObjectId, ref: "Productos"}]
});

export default model<IProveedor>("proveedor",proveedorSchema);