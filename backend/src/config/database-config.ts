import * as mongoose from "mongoose";

export const connectDb = async () => {
    try{
        const mongoURI = process.env.MONGODB_URI;

        if(!mongoURI){
            throw new Error('URI de la base de datos no existe');
        }

        await mongoose.connect(mongoURI);

        console.log('Conexión a MongoDB exitosa');
    }catch(err){
        console.log(err)
    }

}