import { config } from 'dotenv';
import express from 'express';
import { errorHandler } from './src/middlewares/errorHandler';
import index from './src/routes/index';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(index);
app.use(errorHandler);


// const serviceAccountPath = path.resolve(__dirname, process.env.APP_CREDENTIALS || '');
// if (!fs.existsSync(serviceAccountPath)) {
//     throw new Error(`Service account file not found at: ${serviceAccountPath}`);
// }

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
