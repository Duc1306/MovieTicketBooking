import express from "express"
import "dotenv/config";
import cors from "cors"
import { connectDB } from "./configs/db.js";

const app =express();

const port =3000 

// Middleware setup
app.use(express.json());
app.use(cors());

// api routes
app.get('/',(req,res)=>res.send('Server is Live!'))
await connectDB()

app.listen(port, ()=> console.log(`Server listening at http://localhost:${port}`)
)
