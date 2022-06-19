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
router.route('/useres/:id')
      .get(userController.getUser)
      .put(userController.updateUser)
      .delete(userController.deleteUser)
router.route('/email')
      .get(nodeMailerController.contato)

// router.get('/users',privateRouterJWT, userController.getUsers);
// router.post('/users/register', userController.registrarUser);
// router.get('/users/login', userController.loginUser);
// router.get('/users/:id',auth.private, userController.getUser);
// router.post('/users',auth.private, userController.createUser);
// router.put('/users/:id',auth.private, userController.updateUser);
// router.delete('/users/:id',auth.private, userController.deleteUser);
// router.get('/email', nodeMailerController.contato);

export default router