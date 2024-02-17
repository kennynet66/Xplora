import express, { NextFunction, Request, Response, json }  from 'express';
import userRoutes from './Routes/user.Routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(json());

// Import user routes
app.use('/user',userRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(500).json({
        error
    })
})


// Start the server on a port
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('App is listening on port', PORT);  
})