import jwt from 'jsonwebtoken'
import { env } from 'process';

export function generateAccessToken(data: any) {
    if(env.TOKEN_SECRET){
        return jwt.sign(data, env.TOKEN_SECRET, { expiresIn: '1000s' });
    } else {
        throw new Error('Token secret not found');
    }
}

export function getIdFromJWT(token:string){
    if(env.TOKEN_SECRET){
        return jwt.verify(token, env.TOKEN_SECRET);
    } else {
        throw new Error('Token secret not found');
    }
}