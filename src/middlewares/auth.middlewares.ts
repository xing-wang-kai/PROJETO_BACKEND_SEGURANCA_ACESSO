import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let authorizado = false;

        if(req.headers.authorization){
            const [ beares, token ] = req.headers.authorization.split(' ');
            console.log(req.headers.authorization)
            if( beares === 'Bearer'){
                try{
                    console.log({token: token, beares: beares})
                    const decoded = JWT.verify(token, process.env.JWT_KEY as string);
                    console.log({decoded: decoded})
                    authorizado = true
                }catch(err: any){
                    res.status(403).json({message: "acesso negado!!"})
                }
            }
        }
        if(authorizado){
            next();
        }
        else{
            res.status(403).json({message: "acesso negado!!"})
        }
    }
}