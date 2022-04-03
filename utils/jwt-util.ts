import jwt from 'jsonwebtoken'
import { env } from 'process';

type JWTModel = { id: string }

export function generateAccessToken(data: any) {
    if(env.TOKEN_SECRET){
        return jwt.sign(data, env.TOKEN_SECRET, { expiresIn: '10000s' });
    } else {
        throw new Error('Token secret not found');
    }
}

export function getIdFromJWT(token:string){
    if(env.TOKEN_SECRET){
        const decoded = jwt.verify(token, env.TOKEN_SECRET) as JWTModel;
        return decoded.id
    } else {
        throw new Error('Token secret not found');
    }
}

export function logoutJWT(){
    if(env.TOKEN_SECRET){
        return jwt.sign({}, env.TOKEN_SECRET, { expiresIn: '0s' });
    } else {
        throw new Error('Token secret not found');
    }
}