import { Request, Response } from 'express';
import mssql from 'mssql';
import { sqlConfig } from '../config/sqlConfig';

export const oneUser = (async(req: Request, res: Response) =>{
    try {
        const user_id = req.params.user_id;

        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .execute('oneUser')
        ).recordset
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})