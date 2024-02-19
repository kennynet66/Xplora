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
        const SECRET = process.env.ADMIN_SECRET as string
        if (token) {
            jwt.verify(token, SECRET, ((err, decodedToken) => {
                if (err) {
                    return res.status(400).json({
                        error: "You and access aren't related"
                    })
                } else {
                    console.log(decodedToken);
                    res.status(200).json({
                        decodedToken
                    })
                    
                }
            }))
        } else {
            return res.status(400).json({
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