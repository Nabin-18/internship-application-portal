import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { connectDB } from './config/db';
import uploadRoute from './routes/uploadRoute';
import userRoute from './routes/userRoute';
import postRoute from './routes/postRoute'

dotenv.config();
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

connectDB();

app.use('/api/auth', userRoute);
app.use('/api', uploadRoute);
app.use('/admin',postRoute)


app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));