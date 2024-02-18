import { Request, Response } from 'express';
import mssql from 'mssql';
import { sqlConfig } from '../config/sqlConfig';

// Get all users
export const getUsers = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        let users = (await pool.request()
            .execute("getUsers")).recordset;

        if (users.length >= 1) {
            return res.status(200).json({
                users: users
            })
        } else {
            return res.status(201).json({
                nousers: "No users found"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Get a single user using their id
export const oneUser = (async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('oneUser')
        ).recordset

        if (user.length >= 1) {
            res.status(200).json({
                user: user
            })
        } else {
            res.status(201).json({
                usererror: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Deactivate a user
export const deactivateUser = (async(req: Request, res: Response)=>{
    try {
        const id = req.params.id;

        const pool = (await mssql.connect(sqlConfig));

        let result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('deactivateUser')).rowsAffected

        return res.status(200).json({
            success: "Account deactivated successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Activate a deactivated accounted
export const activateUser = (async(req: Request, res: Response)=>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig);

        let result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('activateUser')).recordset

        return res.status(200).json({
            activated: "Account has been activated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

// Delete a user
export const deleteUser = (async(req: Request, res: Response) =>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig);

        let result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('deleteUser')).recordset

        return res.status(200).json({
            deleted: "Account has been deleted successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})