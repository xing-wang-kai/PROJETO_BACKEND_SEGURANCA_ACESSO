import userController from "../controller/user.controller";
import nodeMailerController from '../controller/nodemailer.controller';
import { Router } from 'express';
import { auth } from '../middlewares/auth.middlewares'

const router = Router({mergeParams: true})

router.get('/users', auth.private, userController.getUsers);
router.post('/users/register', userController.registrarUser);
router.get('/users/login', userController.loginUser);
router.get('/users/:id',auth.private, userController.getUser);
router.post('/users',auth.private, userController.createUser);
router.put('/users/:id',auth.private, userController.updateUser);
router.delete('/users/:id',auth.private, userController.deleteUser);
router.get('/email', nodeMailerController.contato);

export default router