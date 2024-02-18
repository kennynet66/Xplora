import { v4 } from "uuid";
import mssql from 'mssql'
import { sqlConfig } from "../config/sqlConfig";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {

    try {
        // Generate a unique ID for a new user
        const id = v4();

        // Get the user details from the request body
        const { full_name, password, email } = req.body;
        const hash_pwd = await bcrypt.hash(password, 5);
        // Create a new pool connection
        const pool = await mssql.connect(sqlConfig);

        if (pool) {
            const result = (await pool.request()
                .input('id', mssql.VarChar, id)
                .input('full_name', mssql.VarChar, full_name)
                .input('email', mssql.VarChar, email)
                .input('password', mssql.VarChar, hash_pwd)
                .execute('createUser')
            ).recordset;

            // Return the record set
            res.status(200).json({
                success: 'User created successfully',
                result
            })
        } else {
            return res.status(500).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}