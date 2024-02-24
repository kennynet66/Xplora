import { Request, Response } from 'express'
import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'
import { v4 } from 'uuid'

export const bookTour = (async(req: Request, res: Response) => {
    try{
        // Create a pool connection
        const pool = await mssql.connect(sqlConfig);
        // Check if the pool connection has been made
        if(pool.connected){
            // Generate a unique booking id for the booking
            const id = v4()
            // Get the user id from the url parameters
            const user_id = req.params.user_id
            // Get the tour id from the request body
            const { tour_id } = req.body
            
            // Check if the user has already booked the tour
            const hasBooked = (await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .input("tour_id", mssql.VarChar, tour_id)
            .execute("checkTour")).rowsAffected

            // Prevent double booking
            if(hasBooked[0] != 0){
                return res.status(201).json({
                    error: "You have already booked this tour"
                })
            } else if(hasBooked[0] == 0){
                // Send the data to the database
            const booking  = (await pool.request()
            .input("id", mssql.VarChar, id)
            .input("user_id", mssql.VarChar, user_id)
            .input("tour_id", mssql.VarChar, tour_id)
            .execute("bookTour")).rowsAffected

            res.status(200).json({
                success: "Tour booked successfully",
            })
            }
            
        } else {
            return res.status(504).json({
                error: "Could not create a pool connection"
            })
        }
    }catch(error){
        res.status(500).json({
            error
        })
    }
})

// Get user bookings
export const getUserBookings = (async(req: Request, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);
        // Check if pool connection was made
        if(pool.connected){
            const id:string = req.params.id

            const userBookings =  (await pool.request()
            .input("user_id", mssql.VarChar, id )
            .execute('getUserBookings')).recordset

            if(userBookings.length > 0){
                res.status(200).json({
                    bookings: userBookings
                })
            } else {
                res.status(200).json({
                    error: "You do not have any bookings"
                })
            }
        } else {
            res.status(500).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(200).json({
            error
        })
    }
})