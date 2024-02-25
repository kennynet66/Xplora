import express, { NextFunction, Request, Response, json } from 'express';
import userRoutes from './Routes/user.Routes';
import dotenv from 'dotenv';
import cors from 'cors'
import tourRoutes from './Routes/tour.Routes';
import bookingRoutes from './Routes/booking.Routes';
import mssql, { ConnectionPool } from 'mssql';
import { sqlConfig } from './config/sqlConfig';
dotenv.config();


const app = express();

app.use(json());
app.use(cors());

// Import user routes
app.use('/user', userRoutes);

// Import tour routes
app.use('/tour', tourRoutes);

// Import the booking routes
app.use('/bookings', bookingRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error
    })
})

// Connect to the database
mssql.connect(sqlConfig, (err?: Error, connect?: ConnectionPool, req?: Request, res?: Response) => {
    if (err) {
        res?.status(500).json({
            err
        })
    } else if (connect) {
        console.log("connected to mssql db");
        // Start the server on a port
        const PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        })
    }
})

