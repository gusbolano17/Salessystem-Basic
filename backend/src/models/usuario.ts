import {Schema,Document,model} from "mongoose";
import bcrypt from 'bcryptjs';

interface IUsuario extends Document{
    nombre : string;
    usuario: string;
    password: string;
    comparePass : (pass : string) => Promise<boolean>;
}

const usuarioSchema = new Schema<IUsuario>({
    nombre : {type: String, required: true},
    usuario: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

usuarioSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

usuarioSchema.methods.comparePass = async function(pass : string){
    return await bcrypt.compare(pass, this.password);
}

export default model<IUsuario>("usuario",usuarioSchema);