var jwt = require('jsonwebtoken');
var privateKey = 'ts94238fh34u9fnmdfinbergibreviervboi3ng034g0938gt549iungt98453ugv9u49v5nuv9v4u9gfvn95ufn4359fb59gu5bn';
       
var login = (conn, req, res) => {
    if(typeof req.body.Username !== "undefined" && typeof req.body.Password !== "undefined"){
        conn.query('SELECT Username, Password, Quotas, Email, status FROM Users WHERE Username = ?', [req.body.Username], (err, results) => {
            if(err) throw err;
            if(results.length == 1){
                const password = results[0].Password;
                const e = results[0].Email;
                const q = results[0].Quotas;
                if(req.body.Password == password){
                    conn.query('UPDATE Users SET status = ? WHERE Username = ?', [1, req.body.Username], (err, results) => {
                        if(err) throw err;
                    });
                    var token = jwt.sign({Username: req.body.Username ,Password: req.body.Password, Email: e, Quotas: q}, privateKey, {algorithm: 'HS256'});
                    res.status(200).send({
                        token : token
                    });
                }
                else res.status(401).send({
                    Message : "Not Authorized"
                });
            }
            else res.status(401).send({
                Message : "Not Authorized"
            });
        });
    }
    else{
        res.status(400).send({
            message : "Bad Request"
        })
    }
};

module.exports =  login;
