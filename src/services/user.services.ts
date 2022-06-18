import userModels from '../models/user.models';
import { User } from '../config/types';

class UserService {
    getUsers = async () => {
        try{
            const users = await userModels.findAll();
            return users
        }catch(err:any){
            return {code: err.code, message: err.message}
        }
    }
    getUser = async (id: number) => {
        try{
            const user = await userModels.findOne({where:{id: id}});
            return user;
        }catch(err:any){
            return {code: err.code, message: err.message}
        }
    }
    findbyEmail = async (email: string) => {
        try{
            const user = await userModels.findOne({where:{email: email}});
            return user;
        }catch(err:any){
            return err
        }
    }
    
    createUser = async (dados: User) => {
        try{
            await userModels.create(dados);
            return
        }catch(err:any){
            return {code: err.code, message: err.message}
        }
    }
    updateUser = async (id: number, dados: User) => {
        try{
            const resultado = await userModels.update(dados, {where: {id: id}})
            return resultado;
        }catch(err:any){
            return {code: err.code, message: err.message}
        }
    }
    deleteUser = async (id: number) => {
        try{
            const resultado = await userModels.destroy({where: {id: id}});
            return resultado;
        }catch(err:any){
            return {code: err.code, message: err.message}
        }
    }
}

export default new UserService;