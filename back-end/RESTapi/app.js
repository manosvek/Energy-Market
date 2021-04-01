const mysql = require('mysql');
const app = require('express')();
const cors = require('cors');
const control = require('./controller/query_controller');
const bodyParser = require('body-parser');
var login = require('./models/login');
var logout = require('./models/logout');
var admin = require('./models/auth');
const https = require('https');
const fs = require('fs');
var multer = require('multer');
var upload = multer();
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manos1998',
  database: 'vescookies'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
});

conn.query(`SET GLOBAL sql_mode = 'ONLY_FULL_GROUP_BY,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`, (err) => {
  if(err) throw err;
});


// //Server listening
// var server = app.listen(8765,() =>{
//     console.log('Server started on port 8765...');
// });


// we will pass our 'app' to 'https' server
var server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'kwdikara'
}, app)
.listen(8765,() =>{
    console.log('Server started on port 8765...');
});


module.exports = server;

app.use(bodyParser.urlencoded({ extended: false , limit:'2000mb'}));
app.use(bodyParser.json({limit:'2000mb'}));
app.use(cors())

app.post("/energy/api/Login", (req, res) => {login(conn, req, res);});

app.post("/energy/api/Logout", (req, res) => {logout(conn, req, res);});

app.post("/energy/api/Admin/users", (req, res) => {
    if(admin(req, res)){
        if(typeof req.body.Username !== 'undefined' && typeof req.body.Password !== 'undefined' && typeof req.body.Email !== 'undefined'){
            conn.query('INSERT INTO Users VALUES (?,?,?,?,?)',[req.body.Username,req.body.Password,req.body.Quotas,req.body.Email,0], (err, results) =>{
                if(err){
                    res.status(400).send({
                        message : "Username Already exists"
                    });
                }
                else {
                    conn.query('SELECT poses FROM grammes', (er,result) => {
                        if(err) throw err;
                        conn.query('UPDATE grammes SET poses = ?',[result[0].poses + 1],(errr,result)=>{
                            if(errr) throw errr;
                            res.status(200).send({
                                message : "User added successful"
                            });
                        });
                    });
                }
            });
        }
        else{
            res.status(400).send({
                message : "Bad Request"
            })
        }
    }
});

app.get("/energy/api/Admin/users/:Username", (req, res) => {
    if(admin(req, res)){
        conn.query("SELECT * FROM Users WHERE Username = ?", [req.params.Username], (err, results) => {
            if(err) throw err;
            if(results.length == 0){
                res.status(403).send({
                    message : "No data"
                });
            }
            else{
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
        });
    }
});

app.put("/energy/api/Admin/users/:Username", (req, res) => {
    if(admin(req, res)){
        conn.query("SELECT COUNT(*) as count from Users WHERE Username = ?",[req.params.Username], (errors,ress) => {
            if(ress[0].count != 1){
                res.status(403).send({
                    message : "No data"
                });
            }
            else{
                if(typeof req.body.Password !== 'undefined' && typeof req.body.Email !== 'undefined'){
                    conn.query('UPDATE Users SET Username = ?,Password = ?, Email = ?, Quotas = ? WHERE Username = ?',[req.params.Username, req.body.Password, req.body.Email, req.body.Quotas, req.params.Username], (err, results) =>{
                        if(err){
                            res.status(400).send({
                                message : "Bad Request"
                            });
                        }
                        else {
                            res.status(200).send({
                                message : "User updated successful"
                            });
                        }
                    });
                }
                else{
                    res.status(400).send({
                        message : "Bad Request"
                    });
                }
            }
        });
    }
});

app.post("/energy/api/Admin/:table", upload.any(), (req,res) => {
    const table = req.params.table;
    const file = req.body.file;
    if (admin(req, res)){
        fs.writeFileSync(table +'.csv',file);
        conn.query(`LOAD DATA LOCAL INFILE '`+ table + `.csv`+ `' INTO TABLE ${table} FIELDS TERMINATED BY ';'  ENCLOSED BY '\"' ESCAPED BY '' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`, (err,results) => {
            if (err) throw err
            else{
                var imported = results.affectedRows;
                conn.query('SELECT * FROM grammes', (er, resul) => {
                    if(er) throw er;
                    conn.query('UPDATE grammes SET poses = ?',[resul[0].poses + imported], (errr,resulting)=>{
                        if(errr) throw errr;
                        res.status(200).send({
                            totalRecordsInFile : imported,
                            totalRecordsImported : imported,
                            totalRecordsInDatabase : resul[0].poses + imported
                        });
                    });
                });
            }
        });
    }
});

app.get("/energy/api/HealthCheck", (req, res) => {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'manos1998',
        database: 'vescookies'
    });
    conn.connect((err) =>{
    if(err) throw err;
    else{
        res.status(200).send({
            status : "OK"
        })
    }
  });
});

app.post("/energy/api/Reset", (req, res) => {
    conn.query("TRUNCATE ActualTotalLoad;", (err,results) => {
        if (err) throw err
        else{
            conn.query("TRUNCATE AggregatedGenerationPerType;", (err,results) => {
                if (err) throw err
                else{
                    conn.query("TRUNCATE DayAheadTotalLoadForecast;", (err,results) => {
                        if (err) throw err
                        else{
                            conn.query("TRUNCATE Users;", (err,results) => {
                                if (err) throw err
                                else{
                                    conn.query("INSERT INTO Users VALUES ('admin', '321nimda', 0, 'pmisiakos@hotmail.com', true);", (err,apot) => {
                                        if (err) throw err
                                        else{
                                            conn.query('UPDATE grammes SET poses = ?',[14469],(grrr,apot)=>{
                                                if(grrr) throw grrr;
                                                res.status(200).send({
                                                    status : "OK"
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.get('/energy/api/ActualTotalLoad/:AreaName/:Resolution/date/:YYYY-:MM-:DD', (req, res) => {control.oneA(conn, req, res)});
app.get('/energy/api/ActualTotalLoad/:AreaName/:Resolution/month/:YYYY-:MM', (req, res) => {control.oneB(conn, req, res)});
app.get('/energy/api/ActualTotalLoad/:AreaName/:Resolution/year/:YYYY', (req, res) => {control.oneC(conn, req, res)});
app.get('/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/date/:YYYY-:MM-:DD', (req, res) => {control.twoA(conn, req, res)});
app.get('/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/month/:YYYY-:MM', (req, res) => {control.twoB(conn, req, res)});
app.get('/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/year/:YYYY', (req, res) => {control.twoC(conn, req, res)});
app.get('/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/date/:YYYY-:MM-:DD', (req, res) => {control.threeA(conn, req, res)});
app.get('/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/month/:YYYY-:MM', (req, res) => {control.threeB(conn, req, res)});
app.get('/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/year/:YYYY', (req, res) => {control.threeC(conn, req, res)});
app.get('/energy/api/ActualvsForecast/:AreaName/:Resolution/date/:YYYY-:MM-:DD', (req, res) => {control.fourA(conn, req, res)});
app.get('/energy/api/ActualvsForecast/:AreaName/:Resolution/month/:YYYY-:MM', (req, res) => {control.fourB(conn, req, res)});
app.get('/energy/api/ActualvsForecast/:AreaName/:Resolution/year/:YYYY', (req, res) => {control.fourC(conn, req, res)});

app.get('*', function(req, res){
    res.status(400).send({
        message: "Bad Request"
    });
});
app.post('*', function(req, res){
    res.status(400).send({
        message: "Bad Request"
    });
});
app.put('*', function(req, res){
    res.status(400).send({
        message: "Bad Request"
    });
});
