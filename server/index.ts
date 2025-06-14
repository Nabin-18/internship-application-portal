import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { connectDB } from './config/db';
import uploadRoute from './routes/uploadRoute';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute'
import clientRoute from './routes/clientRoute'

dotenv.config();
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

connectDB();

app.use('/api/auth', userRoute);
app.use('/api', uploadRoute);
app.use('/admin', adminRoute)
app.use('/client',clientRoute)


app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));