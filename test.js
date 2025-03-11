// test cases

// ✓ add a book
needle.post(
    `http://localhost:3000/add-book`, 
    { name: "Harry Potter and the Philosopher’s Stone", isbn: "978-0-7475-3269-9", author: "J.K Rowling", yearpublished: 1997 },
    { json: true },
    (err, res) => {
        console.log('add book:', res.body);
    }
);

// ✕ add book with missing fields
needle.post(
    `http://localhost:3000/add-book`, 
    { name: 'incomplete book' },
    { json: true },
    (err, res) => {
        console.log('add book (missing fields):', res.body);
    }
);

// ✓ get info by both isbn and author
// http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&aauthor=J.K+Rowling

// ✓ get info by author
// http://localhost:3000/find-by-author?author=J.K+Rowling