import customExpress from './config/customExpress'
import dotenv from 'dotenv';
dotenv.config();

const app = customExpress();

const port = Number.parseInt(process.env.PORT as string);

try{
    app.listen(port)
    console.log({
        message: 'conexão realizada com sucesso', 
        porta: port, 
        host: `http://localhost:${port}`,
        name: "Sistema de Autentificação e autorização de usuários",
        author: 'Kai Wang ❤'
    
    });
}catch(err: any){
    console.log({code: err.code, message: err.message})
}
