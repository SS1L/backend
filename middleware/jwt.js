const jwt = require('jsonwebtoken');


let verify = () => {
    let accesToken = req.cookies.jwt;

    if(!accesToken) return res.status(403).send();
    console.log('all work')
}

