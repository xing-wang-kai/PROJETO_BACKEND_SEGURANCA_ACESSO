import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize(
    process.env.DB as string, 
    process.env.USER as string,
    process.env.PASSWORD as string,
    {
        dialect: 'mysql',
        host: process.env.HOST as string,
        port: Number.parseInt(process.env.DBPORT as string)
    }
)

connection.authenticate()
            .then(()=>console.log({message: 'conexão realizado com sucesso!'}))
            .catch((err: any)=> console.log({code: err.code, message: err.message}))

export default connection;