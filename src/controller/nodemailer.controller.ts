import { Request, Response } from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

class Mailer{
    contato = async ( req: Request, res: Response) => {
        try{

            let transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                host: 'smtp.gmail.com',
                auth: { 
                    user: process.env.MAILER_EMAIL, 
                    pass: process.env.MAILER_PASS 
                } 
            });
    
            const MailOptions = { 
                from: process.env.MAILER_EMAIL,   // sender address
                to: process.env.MAILER_EMAIL,     // receiver (use array of string for a list)
                subject: 'Subject of your email', // Subject line
                html: '<p>Your html here</p>'     // plain text body
            };
    
            let info = await transporter.sendMail(MailOptions);
                console.log("INFO: ",info)  
                
            res.status(200).json({infor: info})
        }
        catch(err: any){
            res.status(404).json({code: err.code, message: err.message})
        }
        
    }    
}

export default new Mailer;
