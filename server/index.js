const PORT = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
