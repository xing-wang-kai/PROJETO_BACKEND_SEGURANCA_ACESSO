import express, { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import cors from 'cors';
import path from 'path';
import passport from './passport';
import userRouter from '../routers/user.routers';

export = () => {
    const app = express();
    app.use(passport.initialize());
    app.use(express.json());
    app.use(express.text());
    app.use(express.raw());
    app.use(express.Router({mergeParams: true}));
    app.use(express.urlencoded({extended: true}));
    app.use('/public', express.static( path.join(__dirname, 'public')));

    app.use( (req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-type, Authorization');
        app.use(cors());
        next();
    });

    // app.use( (req: Request, res: Response, next: NextFunction)=>{
    //     let formatRequest = req.header('Accept');
    //     if(formatRequest === '*/*'){
    //         formatRequest = 'application/json';
    //     }
    //     if(formatRequest !== 'application/json'){
    //         res.status(404).json({message: `o Formato: ${formatRequest} é inválido somente JSON é aceito`})
    //     }
    //     else{
    //         res.end()
    //         next();
    //     }
    // });
    
    app.use((req: Request, res: Response, next: NextFunction)=>{
        res.set('Last-Modified', String(new Date()));
        res.set('X-Powered-By', 'Kai Wang Segurança autendificação api');
        next();
    })
    app.use('/api', userRouter);

    const errorHandle: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction ) => {
        if(err){
            if(err.status){
                res.status(err.status)
            }
            else{
                res.status(400)
            }
            res.json(err);
            console.log(err)
        }
    }
    app.use(errorHandle);

    app.use((req: Request, res: Response)=>{
        res.status(404).json({message: 'rota não localizada'})
    })
    return app
}