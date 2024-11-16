import { config } from 'dotenv';
import express from 'express';
import { errorHandler } from './src/middlewares/errorHandler';
import index from './src/routes/index';
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
app.use(index);
app.use(errorHandler);
config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.listen(process.env.PORT||1337);

console.log(`Server on port ${process.env.PORT}`);