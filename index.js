import express from 'express'
import Connection from './database/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import commentsRouter from './Routes/CommentsRoute.js'
import AuthRouter from './Routes/AuthRoute.js'
import authenticate from './middleware/auth.js';
import cookieParser from 'cookie-parser';
const app = express();

// app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173',credentials:true }));

Connection();
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/comment',authenticate, commentsRouter)




const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})