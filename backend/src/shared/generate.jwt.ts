import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { JWTSECRET } from '../config/jwt';
config();

export async function generateJwtToken(args: any) {
    return await sign(args, JWTSECRET, { expiresIn: '60d' })
}