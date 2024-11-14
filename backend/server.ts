import express from 'express';
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((err, req, res, next) => {
    if (! err) {
        return next();
    }
    res.status(500);
    res.send('500: Internal server error');
});
import index from './src/routes/index';
//routes
app.use(index);
import {config} from 'dotenv';
config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.listen(process.env.PORT||1337);

console.log(`Server on port ${process.env.PORT}`);