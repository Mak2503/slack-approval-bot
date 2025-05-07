import express from 'express';
import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
import "dotenv/config";
import slackRoutes from './routes/slack.js';

// dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/slack', slackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Slack bot running on port ${PORT}`));
