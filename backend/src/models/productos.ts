import {Schema, Document, model} from "mongoose";


interface IProductos extends Document{
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    proveedorId: Schema.Types.ObjectId;
}

const productoSchema : Schema<IProductos> = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    proveedorId: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true }
})

export default model<IProductos>("Productos", productoSchema);