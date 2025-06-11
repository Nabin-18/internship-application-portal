import express from 'express';
import { connectDB } from './config/db';  
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const app = express();
const port = 8000;

//middlware
app.use(express.json());
app.use(cors())

connectDB();

//routes
import userRoute from './routes/userRoute'
app.use('/api/auth', userRoute)


app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
