// import { config } from 'dotenv';
// import express from 'express';
// import admin from 'firebase-admin';
// import { errorHandler } from './src/middlewares/errorHandler';
// import index from './src/routes/index';

// import path from 'path';

// const serviceAccount = require(path.resolve(process.cwd(), 'google-services.json'));

// const app = express();

// //middlewares
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// //routes
// app.use(index);
// app.use(errorHandler);
// config()
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });
// app.listen(process.env.PORT||1337);

// console.log(`Server on port ${process.env.PORT}`);

import { config } from 'dotenv';
import express from 'express';
import admin from 'firebase-admin';
import { errorHandler } from './src/middlewares/errorHandler';
import index from './src/routes/index';

config();

// const serviceAccount = require(path.resolve(process.cwd(), 'google-services.json'));
// var admin = require("firebase-admin");

var serviceAccount = require('../backend/studybuds-firebase.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(index);
app.use(errorHandler);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

admin.initializeApp({
    // credential: admin.credential.applicationDefault()
    credential: admin.credential.cert(serviceAccount)
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
