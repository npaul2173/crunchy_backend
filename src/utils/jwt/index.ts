// import jwt, { SignOptions } from 'jsonwebtoken';

// export const signJwt = (payload: any, options: SignOptions = {}) => {
//     const privateKey = Buffer.from(
//         process.env.ACCESS_TOKEN_PRIVATE_KEY!,
//         'base64'
//     ).toString('ascii');
//     return jwt.sign(payload, privateKey, {
//         ...(options && options),
//         algorithm: 'RS256',
//     });
// };

// export const verifyJwt = <T>(token: string): T | null => {
//     try {
//         const publicKey = Buffer.from(
//             process.env.ACCESS_TOKEN_PUBLIC_KEY!,
//             'base64'
//         ).toString('ascii');
//         console.log('JSON WEB', jwt.verify(token, publicKey));
//         return jwt.verify(token, publicKey) as T;
//     } catch (error) {
//         return null;
//     }
// };
const NEWCONST = -999;
