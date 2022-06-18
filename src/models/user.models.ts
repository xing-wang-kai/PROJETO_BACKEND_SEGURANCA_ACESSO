import { Model, DataTypes} from 'sequelize';
import connection from '../config/database';

interface userInterface extends Model{
    id?: number,
    name: string,
    email: string,
    password: string,
}

const columns = {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'users',
    timestamps: true,
    createdAt: 'CriadoEm',
    updatedAt: 'atualizadoEm',
    version: 'versão'
}

const user = connection.define<userInterface>('users', columns, options);
user.sync({alter: true})
    .then(()=> console.log({code: 200, message:'tabela criada com sucesso', nome: 'user'}))
    .catch((err:any)=> console.log({code: err.code, message: err.message}));

export default user;