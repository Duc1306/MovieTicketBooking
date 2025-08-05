import express from "express"
import "dotenv/config";
import cors from "cors"
import { connectDB } from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./innegst/index.js"
import showRoute from "./routes/showRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

const app =express();

const port =3000 

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())
// Set up the "/api/inngest" (recommended) routes with the serve handler


// api routes
app.get('/',(req,res)=>res.send('Server is Live!'))
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show',showRoute)
app.use('/api/booking',bookingRoute)
await connectDB()

app.listen(port, ()=> console.log(`Server listening at http://localhost:${port}`)
)
