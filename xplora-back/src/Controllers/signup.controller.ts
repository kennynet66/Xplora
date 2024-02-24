import { v4 } from "uuid";
import mssql from 'mssql'
import { sqlConfig } from "../config/sqlConfig";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { signupValidator } from "../Validators/signup.Validator";

export const createUser = async (req: Request, res: Response) => {

    try {
        // Generate a unique ID for a new user
        const id = v4();

        // Get the user details from the request body
        const { full_name, password, email } = req.body;
        // Validate the fields using joi library
        const { error } = signupValidator.validate(req.body)

        if (error) {
            res.status(404).json({
                error: error.details[0].message
            })
        } else {
            const hash_pwd = await bcrypt.hash(password, 5);
            // Create a new pool connection
            const pool = await mssql.connect(sqlConfig);

            if (pool.connected) {
                const exist = (await pool.request()
                    .input("email", mssql.VarChar, email)
                    .execute('existingUser')
                ).rowsAffected
                if (exist[0] != 0) {
                    return res.status(201).json({
                        exists: "Email already registered"
                    })
                } else {
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
                    })
                }


            } else {
                return res.status(500).json({
                    error: "Could not create pool connection"
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}