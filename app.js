import express from 'express';
import { taskRouter } from '#routes/tasks.routes';



const app = express();

// Middlewares
app.use(express.json());


app.use('/tasks', taskRouter);


export default app;
