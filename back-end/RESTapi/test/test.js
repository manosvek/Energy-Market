var chai = require('chai')
var chaiHttp = require('chai-http');
var app = require('../app');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var fs = require("fs");



describe('RestApi Unit and Functional Tests', function() {
  describe('#Database Reset', function() {
    it('Reset of database should be OK', (done) => {
      chai.request(app) .post('/energy/api/Reset') 
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
    }).timeout(10000);
  });


  describe('#Database health Check', function() {
    it('Connection with database should be OK', (done) => {
      chai.request(app) .get('/energy/api/HealthCheck') 
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
    }).timeout(10000);
  });


  describe('#Admin Login Check', function() {
    it('Admin logins OK', (done) => {
      chai.request(app) .post('/energy/api/Login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({Username : 'admin', Password : '321nimda'}) 
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string');
        done();
      });
    }).timeout(10000);
  });


  describe('#Admin Logout Check', function() {
    it('Admin should log out successfully', (done) => {
      chai.request(app) .post('/energy/api/Logout') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiIzMjFuaW1kYSIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haWwuY29tIiwiUXVvdGFzIjowLCJpYXQiOjE1ODI3NTMxNDB9.szCkmaopEGGAAtfVti66j2cQNg8c3HzybUixqj1KzqE')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
    }).timeout(10000);
  });


  describe('#Unauthorized Login', function() {
    it('Wrong credentials should not authorize user', (done) => {
      chai.request(app) .post('/energy/api/Login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({Username : 'mparoufas', Password : 'otinane'}) 
      .end(function(err,res){
        expect(res).to.have.status(401);
        done();
      });
    }).timeout(10000);
  });


  describe('#Create User panos', function() {
    it('Admin creates user successfully', (done) => {
      chai.request(app) .post('/energy/api/Admin/users') 
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiIzMjFuaW1kYSIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haWwuY29tIiwiUXVvdGFzIjowLCJpYXQiOjE1ODI3NTMxNDB9.szCkmaopEGGAAtfVti66j2cQNg8c3HzybUixqj1KzqE')
      .send({Username : 'panos', Password : 'misiakos', Email : 'pmisiakos@hotmail.com', Quotas : 16}) 
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
    }).timeout(10000);
  });


  describe('#Panos Login', function() {
    it('User gets succesfully authorized', (done) => {
      chai.request(app) .post('/energy/api/Login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({Username : 'panos', Password : 'misiakos'}) 
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string');
        done();
      });
    }).timeout(10000);
  });


  describe('#Panos Logout', function() {
    it('User Logout successfully', (done) => {
      chai.request(app) .post('/energy/api/Logout') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
    }).timeout(10000);
  });



  describe('#Admin queries user panos', function() {
    it('panos credentials are correct', (done) => {
      chai.request(app) .get('/energy/api/Admin/users/panos') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiIzMjFuaW1kYSIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haWwuY29tIiwiUXVvdGFzIjowLCJpYXQiOjE1ODI3NTMxNDB9.szCkmaopEGGAAtfVti66j2cQNg8c3HzybUixqj1KzqE')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Username).to.equal('panos');
        expect(JSON.parse(res.text)[0].Password).to.equal('misiakos');
        expect(JSON.parse(res.text)[0].Email).to.equal('pmisiakos@hotmail.com');
        expect(JSON.parse(res.text)[0].Status).to.equal(0);
        expect(JSON.parse(res.text)[0].Quotas).to.equal(16);
        done();
      });
    }).timeout(10000);
  });


  describe('#Actual Total Load', function() {
    it('Import of actual total Load is successful', (done) => {
      fs.readFile("ActualTotalLoad-10days.csv","utf8", function (err, data) {
        if (err) throw err;
        chai.request(app) .post('/energy/api/Admin/ActualTotalLoad') 
          .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiIzMjFuaW1kYSIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haWwuY29tIiwiUXVvdGFzIjowLCJpYXQiOjE1ODI3NTMxNDB9.szCkmaopEGGAAtfVti66j2cQNg8c3HzybUixqj1KzqE')
          .send({file : data})
          .end(function(err,res){
            expect(res).to.have.status(200);
            expect(res.body.totalRecordsInFile).to.equal(38680);
            expect(res.body.totalRecordsImported).to.equal(38680);
            expect(res.body.totalRecordsInDatabase).to.equal(53150);
            done();
          });
      });
    }).timeout(10000);
  });

  describe('#Day Ahead Total Load Forecast', function() {
    it('Import of Day Ahead Total Load Forecast is successful', (done) => {
      fs.readFile("DayAheadTotalLoadForecast-10days.csv","utf8", function (err, data) {
        if (err) throw err;
        chai.request(app) .post('/energy/api/Admin/DayAheadTotalLoadForecast') 
          .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiIzMjFuaW1kYSIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haWwuY29tIiwiUXVvdGFzIjowLCJpYXQiOjE1ODI3NTMxNDB9.szCkmaopEGGAAtfVti66j2cQNg8c3HzybUixqj1KzqE')
          .send({file : data})
          .end(function(err,res){
            expect(res).to.have.status(200);
            expect(res.body.totalRecordsInFile).to.equal(40078);
            expect(res.body.totalRecordsImported).to.equal(40078);
            expect(res.body.totalRecordsInDatabase).to.equal(93228);
            done();
          });
      });
    }).timeout(200000);
  });

  describe('#Aggregated Generation Per Type', function() {
    it('Import of Aggregated Generation Per Type is successful', (done) => {
      fs.readFile("AggregatedGenerationPerType-10days.csv","utf8", function (err, data) {
        if (err) throw err;
      chai.request(app) .post('/energy/api/Admin/AggregatedGenerationPerType') 
        .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiIzMjFuaW1kYSIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haWwuY29tIiwiUXVvdGFzIjowLCJpYXQiOjE1ODI3NTMxNDB9.szCkmaopEGGAAtfVti66j2cQNg8c3HzybUixqj1KzqE')
        .send({file : data})
        .end(function(err,res){
          expect(res).to.have.status(200);
          expect(res.body.totalRecordsInFile).to.equal(330769);
          expect(res.body.totalRecordsImported).to.equal(330769);
          expect(res.body.totalRecordsInDatabase).to.equal(423997);
          done();
        });
      });
    }).timeout(200000);
  });

  describe('#Inactive Panos requests Api', function() {
    it('Actual Total Load Per cannot be invoked', (done) => {
      chai.request(app) .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2018-01-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(401);
        done();
      });
    }).timeout(10000);
  });


  describe('#Panos again Logs in', function() {
    it('User gets succesfully authorized', (done) => {
      chai.request(app) .post('/energy/api/Login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({Username : 'panos', Password : 'misiakos'}) 
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string');
        done();
      });
    }).timeout(10000);
  });


  describe('#1a) Active Panos requests Api', function() {
    it('Actual Total Load Per Day returns OK', (done) => {
      chai.request(app) .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2018-01-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('ActualTotalLoad');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualTotalLoadValue).to.equal(4859.16);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Day).to.equal(10);
        done();
      });
    }).timeout(10000);
  });


  describe('#1b) Active Panos requests Api', function() {
    it('Actual Total Load Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/ActualTotalLoad/Greece/PT60M/month/2018-01') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('ActualTotalLoad');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualTotalLoadByDayValue).to.equal(126713.45);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Day).to.equal(1);
        done();
      });
    }).timeout(10000);
  });


  describe('#1c) Active Panos requests Api', function() {
    it('Actual Total Load Per Year returns OK', (done) => {
      chai.request(app) .get('/energy/api/ActualTotalLoad/Greece/PT60M/year/2018') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('ActualTotalLoad');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualTotalLoadByMonthValue).to.equal(1308759.35);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Year).to.equal(2018);
        done();
      });
    }).timeout(10000);
  });


  describe('#2a) Active Panos requests Api', function() {
    it('Aggregative Generation Per Type Per Day returns OK', (done) => {
      chai.request(app) .get('/energy/api/AggregatedGenerationPerType/Greece/Solar/PT60M/date/2018-01-09') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('AggregatedGenerationPerType');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualGenerationOutputValue).to.equal(0);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Day).to.equal(9);
        expect(JSON.parse(res.text)[0].ProductionType).to.equal('Solar');
        done();
      });
    }).timeout(10000);
  });


  describe('#2b) Active Panos requests Api', function() {
    it('Aggregative Generation Per Type Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/AggregatedGenerationPerType/Greece/Solar/PT60M/month/2018-01') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('AggregatedGenerationPerType');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualGenerationOutputByDayValue).to.equal(8224);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Month).to.equal(1);
        expect(JSON.parse(res.text)[0].ProductionType).to.equal('Solar');
        done();
      });
    }).timeout(10000);
  });


  describe('#2c) Active Panos requests Api', function() {
    it('Aggregative Generation Per Type Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/AggregatedGenerationPerType/Greece/Solar/PT60M/year/2018') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('AggregatedGenerationPerType');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualGenerationOutputByMonthValue).to.equal(55038);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Year).to.equal(2018);
        done();
      });
    }).timeout(10000);
  });

 
  describe('#2aAllTypes) Active Panos requests Api', function() {
    it('Aggregative Generation Per Day returns OK', (done) => {
      chai.request(app) .get('/energy/api/AggregatedGenerationPerType/Greece/AllTypes/PT60M/date/2018-01-09') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('AggregatedGenerationPerType');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualGenerationOutputValue).to.equal(2022);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Day).to.equal(9);
        expect(JSON.parse(res.text)[0].ProductionType).to.equal('Fossil Brown coal/Lignite');
        done();
      });
    }).timeout(10000);
  });


  describe('#2bAllTypes) Active Panos requests Api', function() {
    it('Aggregative Generation Per Type Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/AggregatedGenerationPerType/Greece/AllTypes/PT60M/month/2018-01') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('AggregatedGenerationPerType');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualGenerationOutputByDayValue).to.equal(42393);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Month).to.equal(1);
        expect(JSON.parse(res.text)[0].ProductionType).to.equal('Fossil Brown coal/Lignite');
        done();
      });
    }).timeout(10000);
  });


  describe('#2cAllTypes) Active Panos requests Api', function() {
    it('Aggregative Generation Per Type Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/AggregatedGenerationPerType/Greece/AllTypes/PT60M/year/2018') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('AggregatedGenerationPerType');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Greece');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('GR');
        expect(JSON.parse(res.text)[0].ActualGenerationOutputByMonthValue).to.equal(449604);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT60M');
        expect(JSON.parse(res.text)[0].Year).to.equal(2018);
        done();
      });
    }).timeout(10000);
  });


  describe('#3a) Active Panos requests Api', function() {
    it('Day Ahead Total Load Forecast Per Day returns OK', (done) => {
      chai.request(app) .get('/energy/api/DayAheadTotalLoadForecast/Germany/PT15M/date/2018-01-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('DayAheadTotalLoadForecast');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Germany');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('DE');
        expect(JSON.parse(res.text)[0].DayAheadTotalLoadForecastValue).to.equal(51599.09);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT15M');
        expect(JSON.parse(res.text)[0].Day).to.equal(10);
        done();
      });
    }).timeout(10000);
  });


  describe('#3b) Active Panos requests Api', function() {
    it('Day Ahead Total Load Forecast Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/DayAheadTotalLoadForecast/Germany/PT15M/month/2018-01') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('DayAheadTotalLoadForecast');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Germany');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('DE');
        expect(JSON.parse(res.text)[0].DayAheadTotalLoadForecastByDayValue).to.equal(4501699.77);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT15M');
        expect(JSON.parse(res.text)[0].Month).to.equal(1);
        done();
      });
    }).timeout(10000);
  });


  describe('#3c) Active Panos requests Api', function() {
    it('Day Ahead Total Load Forecast Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/DayAheadTotalLoadForecast/Germany/PT15M/year/2018') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('DayAheadTotalLoadForecast');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Germany');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('DE');
        expect(JSON.parse(res.text)[0].DayAheadTotalLoadForecastByMonthValue).to.equal(48247498.13);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT15M');
        expect(JSON.parse(res.text)[0].Year).to.equal(2018);
        done();
      });
    }).timeout(10000);
  });

  
  describe('#4a) Active Panos requests Api', function() {
    it('Actual vs Forecasted Total Load returns OK', (done) => {
      chai.request(app) .get('/energy/api/ActualvsForecast/Germany/PT15M/date/2018-01-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('ActualVSForecastedTotalLoad');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Germany');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('DE');
        expect(JSON.parse(res.text)[0].ActualTotalLoadValue).to.equal(51826.76);
        expect(JSON.parse(res.text)[0].DayAheadTotalLoadForecastValue).to.equal(51599.09);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT15M');
        expect(JSON.parse(res.text)[0].Day).to.equal(10);
        done();
      });
    }).timeout(10000);
  });


  describe('#4b) Active Panos requests Api', function() {
    it('Actual vs Forecasted Total Load Per Day returns OK', (done) => {
      chai.request(app) .get('/energy/api/ActualvsForecast/Germany/PT15M/month/2018-01') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('ActualVSForecastedTotalLoad');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Germany');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('DE');
        expect(JSON.parse(res.text)[0].ActualTotalLoadByDayValue).to.equal(432163177.92);
        expect(JSON.parse(res.text)[0].DayAheadTotalLoadForecastByDayValue).to.equal(420167437.44);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT15M');
        expect(JSON.parse(res.text)[0].Month).to.equal(1);
        done();
      });
    }).timeout(10000);
  });


  describe('#4c) Active Panos requests Api', function() {
    it('Actual vs Forecasted Total Load Per Month returns OK', (done) => {
      chai.request(app) .get('/energy/api/ActualvsForecast/Germany/PT15M/year/2018') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)[0].Source).to.equal('entso-e');
        expect(JSON.parse(res.text)[0].Dataset).to.equal('ActualVSForecastedTotalLoad');
        expect(JSON.parse(res.text)[0].AreaName).to.equal('Germany');
        expect(JSON.parse(res.text)[0].MapCode).to.equal('DE');
        expect(JSON.parse(res.text)[0].ActualTotalLoadByMonthValue).to.equal(43684541988.2);
        expect(JSON.parse(res.text)[0].DayAheadTotalLoadForecastByMonthValue).to.equal(41637590886.19);
        expect(JSON.parse(res.text)[0].ResolutionCode).to.equal('PT15M');
        expect(JSON.parse(res.text)[0].Year).to.equal(2018);
        done();
      });
    }).timeout(10000);
  });

  
  
  describe('#Active Panos requests Api', function() {
    it('February entries do not exist: No data error', (done) => {
      chai.request(app) .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2018-02-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(403);
        done();
      });
    }).timeout(10000);
  });

  

  describe('#Active Panos requests Api', function() {
    it('Should return error: Out Of Quota', (done) => {
      chai.request(app) .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2018-01-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(402);
        done();
      });
    }).timeout(10000);
  });


  describe('#Panos attempt to use Admin endpoints', function() {
    it('Should return error: Not Authorized', (done) => {
      chai.request(app) .get('/energy/api/Admin/users/panos') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(401);
        done();
      });
    }).timeout(10000);
  });

  

  describe('#Bad Request', function() {
    it('Random Wrong invocation of Api gets Bad Request', (done) => {
      chai.request(app) .get('/energeia/restapi/fortio/ellada/per50/date/2018-01-10') 
      .set('X-OBSERVATORY-AUTH', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InBhbm9zIiwiUGFzc3dvcmQiOiJtaXNpYWtvcyIsIkVtYWlsIjoicG1pc2lha29zQGhvdG1haS5jb20iLCJRdW90YXMiOjAsImlhdCI6MTU4Mjc5ODI4OH0.w3NMCdzkO0QBYPU2w41LpfREycweWaI9VOSLvzdR4Z4')
      .end(function(err,res){
        expect(res).to.have.status(400);
        done();
      });
    }).timeout(10000);
  });

});
