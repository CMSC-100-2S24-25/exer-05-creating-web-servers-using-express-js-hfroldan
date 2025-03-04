import express from 'express'
import needle from 'needle'
import fs from 'node:fs'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;
const FILE_PATH = 'books.txt';

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))