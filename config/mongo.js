const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'movie';
let insert;

const db = () => {
    MongoClient.connect(url, (e, client) => {
        if (e) return console.log(e);
        insert = client.db(dbName);
        console.log(dbName)
        // let myObj = { name: 'Serega' };
        // insert.collection(dbName).insertOne(myObj);
        // console.log('connected to MongoDB');
    })
}
console.log(db);

module.exports = db;