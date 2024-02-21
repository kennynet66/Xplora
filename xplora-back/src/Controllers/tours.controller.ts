import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from 'mssql';
import { tour } from "../Interfaces/tour.interface";
import { sqlConfig } from "../config/sqlConfig";

export const createTour = (async (req: Request, res: Response) => {
    try {
        const id = v4();
        const { tour_title, tour_dest, tour_desc, tour_img, start_date, end_date }: tour = req.body

        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            let result = (await pool.request()
                .input("id", mssql.VarChar, id)
                .input("tour_title", mssql.VarChar, tour_title)
                .input("tour_dest", mssql.VarChar, tour_dest)
                .input("tour_desc", mssql.VarChar, tour_desc)
                .input("tour_img", mssql.VarChar, tour_img)
                .input("start_date", mssql.VarChar, start_date)
                .input("end_date", mssql.VarChar, end_date)
                .execute("createTour")
            ).rowsAffected

            console.log(result)
            res.status(200).json({
                toursuccess: "Tour created successfully"
            })
        } else {
            res.status(201).json({
                error: "Could not create pool connection"
            })

        }


    } catch (error) {
        res.status(500).json({
            error
        })
    }
})