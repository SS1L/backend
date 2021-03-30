// const db = require('../config/db')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mongo = require('mongodb').MongoClient;

const url = process.env.URL;
const dbName = process.env.DB_NAME;
let db;

mongo.connect(url, (e, client) => {
    if (e) return console.log(e);
    db = client.db(dbName);
});

class UserAuth {
    async postAuth(req, res) {
        const { email, nickname, pass, repPass } = req.body;
        try {
            let checkEmail = await db.collection('movie').findOne({ email })
            if (checkEmail) return res.status(409).json({ message: 'Already exists' });

            if (pass !== repPass) return res.status(409).json({ message: 'Repeat password is incorrect' });

            let passEnc = await bcrypt.hash(req.body.pass, 12)
            console.log(req.body)
            db.collection('movie').insert({ email, nickname, pass: passEnc })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' })
        }
        return res.send(req.body)

    }

    async postLogin(req, res) {
        const { email, pass } = req.body;
        try {
            let userData = await db.collection('movie').findOne({ email });
            if (!userData) return res.send(401).json({ message: 'Unauthorized' });

            let passDecrypt = await bcrypt.compare(pass, userData.pass);
            if (!passDecrypt) return res.status(401).json({ message: 'Unauthorized' });



            let paylod = { nickname: userData.nickname }

            let accessToken = jwt.sign(paylod, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: process.env.ACCESS_TOKEN_LIFE });

            let refreshToken = jwt.sign(paylod, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: process.env.REFRESH_TOKEN_LIFE });

            res.cookie('jwt', accessToken, {secure: true, httpOnly: true});
            res.send()

        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new UserAuth()