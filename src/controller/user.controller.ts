import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

import userServices from "../services/user.services";
import { User } from '../config/types';

dotenv.config();
/**
 * Classe Usuário Recebe todas Rotas necessárias para retornar valores informado no banco de dados para usários, está class se comunica diretamente com o services e faz as requisições para o banco de dado.
 */
class UserControllers{
    /**
     * Este metodo dentro da class user faz a solcitação da requisição e estnão retorna um array com todos objetos de usuários  que estão includos dentro da API.
     * @param req Requisição.
     * @param res Resposta da Requisão.
     */
    getUsers = async (req: Request, res: Response) => {
        try{
            const users = await userServices.getUsers();
            res.status(200)
                .json({users: users})
        }catch(err: any){
            res.status(404)
                .json({code: err.code, message: err.message})
        }
    }
    getUser = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;
            const user = await userServices.getUser(Number.parseInt(id))
            res.status(200).json({user: user});
        }
        catch(err: any){
            res.status(404)
                .json(err)
        }
    }
    createUser = async (req: Request, res: Response) => {
        try{
            let dados: User = req.body;
            const user = await userServices.findbyEmail(dados.email);
            if(!user){
                dados.password = await bcrypt.hash(dados.password, 12);
                const novoUser = await userServices.createUser(dados);
                res.status(202).json({message: `Usuário criado com sucesso`, user: dados, novoUser: novoUser})
            }
            else{
                res.status(404).json({message: `Usuário já existe`})
            }
        }
        catch(err: any){
            res.status(404)
                .json(err)
        }
    }
    registrarUser = async (req: Request, res: Response) => {
        if(req.body.email && req.body.password){
            let dados: User = req.body
            const user = await userServices.findbyEmail(dados.email)
            if(!user){
                dados.password = await bcrypt.hash(dados.password, 12);
                const novoUser = await userServices.createUser(dados);
                const newUser = await userServices.findbyEmail(dados.email);
                res.status(202).json({message: `Usuário criado com sucesso`, user: dados, novoUser: newUser})
            }else{
                res.status(404).json({message: `Usuário já existe`})
            }
        }else{
            res.status(404).json({message: `usuário ou email não informado`})
        }
    }
    loginUser = async (req: Request, res: Response) => {
        if(req.body.email && req.body.password){
            const dados: User = req.body
            const user = await userServices.findbyEmail(dados.email);
            if(user){
                const password: boolean = await bcrypt.compare(dados.password, user.password)
                if(password){
                    const token = JWT.sign(
                        { id: user.id, password: user.password, email: user.email }, 
                        process.env.JWT_KEY as string, 
                        { expiresIn: '7d' })
                    res.status(202).json({
                            message: `Login Realizado com sucesso`, 
                            user: user,
                            token: token
                        })
                }
                else{
                    res.status(404).json({message: `Error nos Dados informado verifique login e senha`})
                }
            }else{
                res.status(404).json({message: `Error nos Dados informado verifique login e senha`})
            }
        }else{
            res.status(404).json({message: `usuário ou email não informado`})
        }
    }
    updateUser = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;
            const dados: User = req.body;
            const user = await userServices.getUser(Number.parseInt(id));
            if(user === null){
                res.status(404).json({message:`User id=${id} não existe`, status: 'Error Tente novamente!'})
            }
            else{
                await userServices.updateUser(Number.parseInt(id), dados);
                const novosdados = await userServices.getUser(Number.parseInt(id));
                res.status(200).json({
                    message: `User id=${id} Editado`, 
                    dadosAnteriores: user, 
                    novosDados: novosdados
                })
            }
        }
        catch(err: any){
            res.status(404)
                .json(err)
        }
    }
    deleteUser = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;
            const user = await userServices.getUser(Number.parseInt(id));
            if(user===null){
                res.status(404).json({message:`User id=${id} não existe`, status: 'Error Tente novamente!'})
            }else{
                await userServices.deleteUser(Number.parseInt(id));
                res.status(200).json({message:`User id=${id} Deletado`, status: 'sucesso!' })
            }
        }
        catch(err: any){
            res.status(404)
                .json(err)
        }
    }
}

export default new UserControllers;