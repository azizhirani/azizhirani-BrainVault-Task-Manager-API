import express from 'express';
import { taskRouter } from '#routes/tasks.routes';

const app = express();

// Middlewares
app.use(express.json());


app.use('/task', taskRouter);


export default app;
