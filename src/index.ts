import customExpress from './config/customExpress'
import dotenv from 'dotenv';
dotenv.config();

const app = customExpress();
/**
 * Verific a Porta a API e então retorna um valor formatado em número armazenado em dotenv.
 */
const port = Number.parseInt(process.env.PORT as string);
/**
 * retorna em um try se a conexão foi realizada com sucesso e um json com informações da conexão.
 */
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
