const express =  require('express');
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

//routes
app.use(require('./src/routes/index'));

require('dotenv').config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.listen(process.env.PORT||1337);

console.log(`Server on port ${process.env.PORT}`);