import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const requireAuth = ((req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string
        const SECRET = process.env.SECRET as string
        if (token) {
            jwt.verify(token, SECRET, (err, decodedToken) => {
                if (err) {
                    return res.status(201).json({
                        error: "You do not have access"
                    })
                } else {
                    next()
                }
            })
        } else {
            return res.status(201).json({
                error: "You do not have access"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }

})

export const requireAdmin = ((req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string;
        const ADMIN_SECRET = process.env.ADMIN_SECRET as string;

        if(token){
            jwt.verify(token, ADMIN_SECRET, (err, decodedToken)=>{
                if(err){
                    return res.status(201).json({
                        error: "You do not have access"
                    })
                }else {
                    next();
                }
            })
        }else {
            return res.status(201).json({
                error: "You do not have access"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})