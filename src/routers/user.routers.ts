import userController from "../controller/user.controller";
import nodeMailerController from '../controller/nodemailer.controller';
import { Router } from 'express';
import { auth } from '../middlewares/auth.middlewares';
import { privateRouter } from '../config/passport'
    // JWT, 
    // BASIC, 
    // Local, 
    // Bearer 

const router = Router({mergeParams: true})

router.route('/users')
      .get(privateRouter.Bearer, userController.getUsers)
      .post(auth.private, userController.createUser)
router.route('/users/register')
      .post(userController.registrarUser)
router.route('/users/login')
      .get(userController.loginUser)
router.route('/users/logout')
      .get(privateRouter.Bearer, userController.logoutUser)
router.route('/useres/:id')
      .get(privateRouter.Bearer, userController.getUser)
      .put(privateRouter.Bearer, userController.updateUser)
      .delete(privateRouter.Bearer, userController.deleteUser)
router.route('/email')
      .get(privateRouter.Bearer, nodeMailerController.contato)

export default router