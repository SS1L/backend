// const db = require('../config/db')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const https = require('https');

class SearchBook {
    async searchBook(req, res) {
        let books = req.query.data;
        console.log()
        await https.get('https://www.googleapis.com/books/v1/volumes?q=' + books + '&key=' + process.env.GOOGLE_API, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;

            });

            resp.on('end', () => {
                res.send(data)

            });
        }).on('error', (err) => {
            console.log('Error: ' + err.message)
        });
    }

    async describeBook(req, res) {
        let bookId = req.query[0];
        console.log(bookId)
        await https.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                res.send(data)
            })
        })
    }
}

module.exports = new SearchBook()