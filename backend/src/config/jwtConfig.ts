import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('La clave secreta no está definida en las variables de entorno');
    }

    const options: jwt.SignOptions = { expiresIn : 3600 };

    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {

    try{
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET no está definida en las variables de entorno');
        }

        return jwt.verify(token, secret)
    }catch(err){
        console.error("Error:", err);
        return null;
    }
}