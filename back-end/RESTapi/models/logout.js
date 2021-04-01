var jwt = require('jsonwebtoken');
var privateKey = 'ts94238fh34u9fnmdfinbergibreviervboi3ng034g0938gt549iungt98453ugv9u49v5nuv9v4u9gfvn95ufn4359fb59gu5bn';

var logout = (conn, req, res) => {
    var token = req.headers['x-observatory-auth'];
    var decoded = jwt.decode(token, privateKey);
    if(decoded != null){
        conn.query('SELECT COUNT(*) as count FROM Users WHERE Username = ? and status = 1', [decoded.Username], (err, results) => {
            if(err) throw err;
            var count = results[0].count;
            if(count == 1){
                conn.query('UPDATE Users SET status = 0 WHERE Username = ?', [decoded.Username], (err, results) => {
                    if(err) throw err;
                    else{
                        res.status(200).send()
                    } 
                });
            }
            else{
                res.status(401).send({
                    message : "Not Authorized"
                });
            }
        });
    }
    else{
        res.status(401).send({
            message : "Not Authorized"
        });
    }
    
};

module.exports =  logout;