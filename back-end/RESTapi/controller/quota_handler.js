var jwt = require('jsonwebtoken');
var privateKey = 'ts94238fh34u9fnmdfinbergibreviervboi3ng034g0938gt549iungt98453ugv9u49v5nuv9v4u9gfvn95ufn4359fb59gu5bn';


var handler = (conn, req, res, err, results) => {
  var token = req.headers['x-observatory-auth'];
  var decoded = jwt.decode(token, privateKey);
  if(decoded != null){
    conn.query('SELECT COUNT(*) as count, Quotas FROM Users WHERE Username = ? and status = 1', [decoded.Username], (error, result) => {
      if(error) throw error;
      var count = result[0].count;
      var quotas = result[0].Quotas;
      if(count != 1){
        res.status(401).send({
          message : "Not Authorized"
        });
      }
      else{
        if(quotas > 0 || decoded.Username == 'admin'){// accepted up to quotas requests overall per user session. If he logs out then requests become 20. (except admin)
          conn.query('UPDATE Users SET Quotas = ? WHERE Username = ?', [quotas - 1, decoded.Username], (errr, r) => {
            if(errr) throw errr;
            else{
              if(err){
                res.status(400).send({
                  message: "Bad Request"
                });
              } 
              else{
                if(results.length == 0){
                  res.status(403).send({
                    message : "No data"
                  });
                }
                else {
                  if(req.query.format!== undefined && req.query.format == "csv"){
                    const {Parser} = require('json2csv');
                    const json2csvParser = new Parser();
                    const csv = json2csvParser.parse(results);
                    res.send(csv);
                  }
                  else if(req.query.format == undefined || req.query.format =="json"){
                    res.send(JSON.stringify(results));
                  }
                  else {
                    res.status(400).send({
                      message: "Bad Request"
                    });
                  }
                }
              }
            } 
          });
        }
        else{
          res.status(402).send({
            message: 'Out of Quota'
          });
        }
      }
    });
  }
  else {
    res.status(401).send({
      Authorization : "Not Authorized"
    });
  }
}

module.exports = handler;