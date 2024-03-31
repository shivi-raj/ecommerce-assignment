require('dotenv').config();
import express from 'express'
import { appRouter } from './appRouter';
import { logger } from './libs/logger';
import bodyParser from 'body-parser';
import { handleError, handleSuccess } from './middlewares/responseHandler';



const app = express();
const PORT = process.env.PORT;
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Using response handlers
app.use(handleSuccess);
app.use(handleError);



appRouter(app);

app.listen(PORT, ()=>{
    logger.info(`Server is running on Port : ${PORT}`);
})