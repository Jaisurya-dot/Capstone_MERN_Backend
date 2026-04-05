import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db_config/db.js';
import courseRouter from './routers/courseRouter.js';
import moduleRouter from './routers/moduleRouter.js';
import commentRouter from './routers/commentRouter.js';
import noteRouter from './routers/noteRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use('/api/courses', courseRouter);
app.use('/api/modules', moduleRouter);
app.use('/api/comments', commentRouter);
app.use('/api/notes', noteRouter);  
 
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});