import { Request, Response } from 'express';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import { userDetails } from './login.controller';

interface decTok {
    details: userDetails,
    iat: number,
    exp: number
}

export const checkDetails = ((req: Request, res: Response)=>{
    try {
        const token = req.headers['token'] as string;
        const USER_SECRET = process.env.SECRET as string
        if (token) {
            jwt.verify(token, USER_SECRET, ((err, decodedToken) => {
                if (err) {
                const ADMIN_SECRET = process.env.ADMIN_SECRET as string

                jwt.verify(token, ADMIN_SECRET, ((err, decodedToken)=>{
                if(err){
                return res.status(201).json({
                        error: "You are not an admin"
                    })
                } else {
                    res.status(200).json({
                        decodedToken
                    })
                }
                }))
                } else {
                    res.status(200).json({
                        decodedToken
                    })
                }
            }))
        } else {
            return res.status(404).json({
                error: "You do not have access"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            error: error
        })
    }
})