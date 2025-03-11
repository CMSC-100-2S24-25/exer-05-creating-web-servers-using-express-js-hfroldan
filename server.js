import express from 'express'
import needle from 'needle'
import fs from 'node:fs'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;
const FILE_PATH = 'books.txt';

function getBooks() {
    if (!fs.existsSync(FILE_PATH)) return [];

    const data = fs.readFileSync(FILE_PATH, 'utf8').trim();

    let books = data 
    ? data.split('\n').map(book => {
        let [name, isbn, author, yearpublished] = book.split(',');
        return { name, isbn, author, yearpublished };
    })
    : [];

    return books;
}

app.post('/add-book', (req, res) => {
    const  { name, isbn, author, yearpublished } = req.body;
    
    if (!name || !isbn || !author || !yearpublished) {
        return res.json({ success: false })
    };
    
    fs.appendFileSync(FILE_PATH, `${name},${isbn},${author},${yearpublished}\n`, 'utf8');

    return res.json({ success: true })
})

needle.get('http://localhost:3000', (err, res) => {
    app.get('/find-by-isbn-author', (req, res) => {
        const { isbn, author } = req.query;
        const filteredBooks = getBooks().filter(book => book.isbn === isbn && book.author === author);
        console.log(filteredBooks);
    });
    
    app.get('/find-by-author', (req, res) => {
        const { author } = req.query;
        const filteredBooks = getBooks().filter(book => book.author === author);
        console.log(filteredBooks);
    });
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))