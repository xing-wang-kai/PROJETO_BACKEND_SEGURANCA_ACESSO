import blocklist from './blocklist';
import jwt from 'jsonwebtoken'
import { promisify } from 'util';
import { createHash } from 'crypto'

const existsAsync = promisify(blocklist.exists).bind(blocklist)
const setAsync = promisify(blocklist.set).bind(blocklist);

const gerarTokenHash = (token: string) => {
    return createHash('sha256').update(token).digest('hex')
}

const blocklistToken: any[] = []

export default {
    adiciona: async (token: string) => {
        try{
            const decoded: any = jwt.decode(token)
            const expiredAt: any = decoded.exp;
            const tokenHash = gerarTokenHash(token)
            blocklistToken.push(tokenHash)
            console.log({message: blocklistToken})
            //await setAsync(tokenHash, '');
            //blocklist.expireAt(tokenHash, expiredAt)
        }catch(err: any){
            console.log({message: err.message, code: err.code, name: err.name})
        }
        
    },
    contemToken: async (token: string) => {
        const tokenHash = gerarTokenHash(token)
        if(blocklistToken.indexOf(tokenHash) !== -1){
            return true;
        }
        else{
            return false;
        }
        //const resultado = await existsAsync(tokenHash);
        //return resultado === 1;
    }
}