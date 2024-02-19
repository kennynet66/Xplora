import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../config/sqlConfig";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { user } from "../Interfaces/user.interface";
import dotenv from 'dotenv';

dotenv.config();

export interface userDetails {
    id: string
    full_name: string
    email: string
    profile_img: string
}

const maxAge = 3 * 24 * 24 * 60;
const createToken = (details: userDetails) => {
    const SECRET = process.env.SECRET as string
    const token = jwt.sign({ details }, SECRET, {
        expiresIn: maxAge
    })
    return token
}

const createAdminToken = (details: userDetails) => {
    const SECRET = process.env.ADMIN_SECRET as string
    const token = jwt.sign({ details }, SECRET, {
        expiresIn: maxAge
    })
    return token
}

export const loginUser = (async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const user = (await pool.request()
                .input('email', mssql.VarChar, email)
                .execute('loginUser')).recordset;

            if (user[0]?.email == email) {
                // Validate the password
                const ispwd = await bcrypt.compare(password, user[0].password)
                if (!ispwd) {
                    res.status(200).json({
                        pwderr: "Incorrect Password"
                    })
                } else {
                    const details: userDetails = {
                        id: user[0].id,
                        full_name: user[0].id,
                        email: user[0].email,
                        profile_img: user[0].profile_img
                    }
                    if (!user[0]?.isAdmin) {
                        if (user[0].isDeleted) {
                            return res.status(202).json({
                                deactivated: "Your account is deactivated"
                            })
                        } else {
                            const token = createToken(details);
                            return res.status(200).json({
                                user: "User login success",
                                token
                            })
                        }

                    } else {
                        const token = createAdminToken(details);
                        return res.status(200).json({
                            admin: "Admin login success",
                            token
                        })
                    }

                }

            } else {
                return res.status(200).json({
                    emailerror: "User not found"
                })
            }

        } else {
            return res.status(500).json({
                error: "Could not create a pool connection"
            })
        }


    } catch (error) {
        res.status(500).json({
            error
        })
    }
})