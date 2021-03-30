// const db = require('../config/db')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const https = require('https');

class SearchBook {
    async searchBook(req, res) {
        let books = req.query.data;
        console.log()
        await https.get('https://www.googleapis.com/books/v1/volumes?q='+ books +'&key=' + process.env.GOOGLE_API, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            resp.on('end', () => {
                console.log(data)
                
            });
       }).on('error', (err) => {
           console.log('Error: ' + err.message)
       });

    } 
}

module.exports = new SearchBook()