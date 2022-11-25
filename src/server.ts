import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', router);

export default app;