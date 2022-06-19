import passport from "passport";
import { BasicStrategy } from 'passport-http';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

import UserService from '../services/user.services';
import {Request, Response, NextFunction} from 'express';

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string
}
const notAuthJson = {status: 401, message: 'Não authorizado'};

passport.use(new JWTStrategy(options, async (payload, done)=>{
    const user = await UserService.getUser(payload.id);
    if(user){return done(null, user)}
    else{return done(notAuthJson, false)}
}))

passport.use(new BasicStrategy(async (email, password, done)=>{
    const user = await UserService.findbyEmail(email);
    if(!user){return done(notAuthJson, false);};
    if(!await bcrypt.compare(password, user.password)){return done(notAuthJson, false);}
    return done(null, user)
}));

const localOptions = {
    usernameField: 'email',
    passwordField: 'senha',
    session: false
}

passport.use(new LocalStrategy(localOptions, async (email, senha, done) =>{
    const user = await UserService.findbyEmail(email);
    if(!user){return done(notAuthJson, false);}
    if(!await bcrypt.compare(senha, user.senha)){return done(notAuthJson, false);}
    return done(null, user);
} ))

passport.use(new BearerStrategy( async (token, done)=>{
    try{
        const payload: string | JWT.JwtPayload | any = JWT.verify(token, process.env.JWT_KEY as string);
        const user = await UserService.getUser(payload.id);
        if(!user){return done(notAuthJson, false);}
        return done(null, user);
    }catch(err){
        return done(err, false)
    }
}))

export const privateRouter = {
    JWT: (req: Request, res: Response, next: NextFunction) => {
        const authFunction = passport.authenticate('jwt', (err, user)=>{
            req.user = user;
            return user? next() : next(notAuthJson);
        })
        authFunction(req, res, next)
    },
    Basic: (req: Request, res: Response, next: NextFunction) => {
        const authFunction = passport.authenticate('basic', (err, user)=>{
            req.user = user;
           return user? next() : next(notAuthJson);
        })
        authFunction(req, res, next);
    },
    Local: (req: Request, res: Response, next: NextFunction) => {
        const authFunction = passport.authenticate('local', (err, user)=>{
            req.user = user;
            return user? next(): next(notAuthJson);
        })
        authFunction(req, res, next);
    },
    Bearer: (req: Request, res: Response, next: NextFunction) => {
        const authFunction = passport.authenticate('bearer',{session: false}, (err, user, info)=>{
            if(err && err.name === 'InvalidArgumentError'){
                res.status(401).json({code: err.code, message: err.message, name: err.name, middlesware: notAuthJson})
            }
            if(err){
                res.status(500).json({code: err.code, message: err.message, name: err.name, middlesware: notAuthJson})
            }
            req.user = user;
            return user? next() : next(notAuthJson);
        })
        authFunction(req, res, next)
    }
    
}


export default passport;

