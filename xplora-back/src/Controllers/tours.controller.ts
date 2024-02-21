import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from 'mssql';
import { tour } from "../Interfaces/tour.interface";
import { sqlConfig } from "../config/sqlConfig";
import { tourValidator } from "../Validators/tour.Validator";

export const createTour = (async (req: Request, res: Response) => {
    try {
        const id = v4();
        const { tour_title, tour_dest, tour_desc, tour_img, start_date, end_date }: tour = req.body

        // Validate the data using joi
        const { error } = tourValidator.validate(req.body);
        // If the validator returns an error respond with a 404
        if (error) {
            res.status(404).json({
                error: error.details[0].message
            })
        } else {
            // Create a pool connection
            const pool = await mssql.connect(sqlConfig);
            // Handle errors arising from pool connection
            if (pool.connected) {
                // Insert the data to the table
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
                res.status(200).json({
                    toursuccess: "Tour created successfully"
                })
            } else {
                res.status(201).json({
                    error: "Could not create pool connection"
                })

            }
        }

    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Get all tours
export const getAllTours = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const tours = (await pool.request()
                .execute("getAllTours")
            ).recordset;
            res.status(200).json({
                tours
            })
        } else {
            res.status(502).json({
                error: "Could not create pool connection"
            })
        }


    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Delete tour by id
export const deleteTour = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const id = req.params.id;

            const result = (await pool.request()
                .input("id", mssql.VarChar, id)
                .execute("deleteTour")).rowsAffected

            if (result[0] == 0){
                res.status(201).json({
                    error: "Could not delete tour"
                })
            } else {
                res.status(200).json({
                    success: "Deleted successfully",
                    result
                })
            }
        } else {
            res.status(502).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(500).json([
            error
        ])
    }
})

// Cancel a tour
export const cancelTour = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const id = req.params.id

            let tours = (await pool.request()
                .input("id", mssql.VarChar, id)
                .execute('cancelTour')).rowsAffected
            console.log(tours)
                if(tours[0] != 1) {
                    return res.status(201).json({
                        error: "Could not cancel tour"
                    })
                    
                } else {
                    return res.status(201).json({
                        success: "Tour successfully cancelled"
                    })
                }
        } else {
            return res.status(504).json({
                error: "Could not create pool connection"
            })
        }

    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Get cancelled tours
export const getCancelled = (async(req: Request, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);
        if(pool.connected){
            const tours = (await pool.request()
            .execute("cancelledTours")).recordset

            if(tours.length < 1){
                res.status(201).json({
                    notours: "No cancelled tours"
                })
            } else {
                res.status(200).json({
                tours
            })
            }
            
        } else {
            res.status(504).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Restore a cancelled tour

export const restoreTour = (async(req: Request, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            const id = req.params.id

            const tours = (await pool.request()
            .input("id", mssql.VarChar, id)
            .execute("restoreTour")
            ).rowsAffected
            if(tours[0] != 1) {
                return res.status(201).json({
                    error: "Could not restore tour"
                })
                
            } else {
                return res.status(201).json({
                    success: "Tour successfully restored"
                })
            }
        }else {
            res.status(201).json({
                error: "Could not create a pool connection"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})