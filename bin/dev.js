const dotenv = require('dotenv');
const express = require('express');
const { handler } = require('../dist/index');

dotenv.config();

const app = express();

const { GITBOOK_API_KEY, GITBOOK_SPACE_ID, PORT } = process.env;

if(GITBOOK_API_KEY === undefined) {
    console.log('`GITBOOK_API_KEY` not set. Copy .env.example to .env first.');
    process.exit(1);
}

if(GITBOOK_SPACE_ID === undefined) {
    console.log('`GITBOOK_SPACE_ID` not set. Copy .env.example to .env first.');
    process.exit(1);
}

app.get('/', async (req, res) => {
    const { query } = req.query;

    const event = {
        body: JSON.stringify({
            args: {
                query
            },
            secrets: {
                GITBOOK_API_KEY,
                GITBOOK_SPACE_ID
            }
        })
    }

    const result = await handler(event)

    res.status(result.statusCode).send(result.body);
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Local development server running on port ${port}`);
});
