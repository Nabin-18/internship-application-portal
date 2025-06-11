import express from 'express';
import { connectDB } from './config/db';  
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8000;

//middlware
app.use(express.json());

connectDB();

//routes
import userRoute from './routes/userRoute'
app.use('/api/user', userRoute)


app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
