const mongo = require('mongodb').MongoClient;

const db = mongo.connect(
    'mongodb://localhost:27017',
    (e, client) => {
        if (e) {
            console.log(e);
            throw e;
        }
        console.log('db is woriking');
        const db = client.db('movie');
        const users = db.collection('movie')
        client.close();
    }
)

module.exports = db;