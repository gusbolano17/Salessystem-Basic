import {model, Schema} from "mongoose";

export interface Locacion{
    pais : string;
    ciudades: string[];
    estado: string;
}

export const locacionSchema : Schema<Locacion> = new Schema({
    pais : {type: String},
    ciudades: [{type: String}],
    estado: {type: String},
});

export default model<Locacion>("locacion", locacionSchema);