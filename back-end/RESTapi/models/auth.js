var jwt = require('jsonwebtoken');
var privateKey = 'ts94238fh34u9fnmdfinbergibreviervboi3ng034g0938gt549iungt98453ugv9u49v5nuv9v4u9gfvn95ufn4359fb59gu5bn';

var admin  = (req, res) => {
    var token = req.headers['x-observatory-auth'];
    var decoded = jwt.decode(token, privateKey);
    if(decoded == null || decoded.Username!= 'admin'){
        res.status(401).send({
            message : "Not authorized"
        })
        return false;
    }
    else{
        return true;
    }  
};

module.exports = admin;

