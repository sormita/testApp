var rewire = require('rewire');
let chai = require("chai");
let chaiHttp = require("chai-http");
var expect = chai.expect;
var assert = chai.assert;
let server = require('../server');
const bodyParser = require('body-parser');
chai.should();
chai.use(chaiHttp);
chai.use(require('chai-json'));
//let apiStatus = require('../GUI/src/api');


describe("GET /api/hello",  () => {
  it("Express sends hello message", (done) => {
    //data = JSON.parse(data);
    chai.request('http://localhost:8080/')
      .get("/api/hello")
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        expect(err).to.be.null;
      done();      
  });
});
});
  describe("POST /api",  () => {
    it("checks log",  (done) => {
      chai.request('http://localhost:8080/')
        .post("/api")
        
        //.end((err, res, body) => {
        //res.body.should.have.property("message_type").eq("it works");
        //res.should.have.status(404);  
       done();
    });
    it("checks log", (done) => {
      chai.request('http://localhost:8080/')
        .post("/api/log")
        .set('content-type', 'application/x-www-form-urlencoded')
            .send({"message_type": "it works",
                   "text": "passwordtest",
                   "options": "none"})
            .end(function(error, response, body) {
                if (error) {
                    return done(error);
                } else {
                    done();
                }
            });
      });
    });
    /*it("cluster is being served", (done) => {
      chai.request("http://localhost:8080/")
        .get("/api/cluster")
        .end((err, response) => {
          response.should.have.status(200);
          expect(err).to.be.null;
        done();
      
    });
  });
     it("checks server", (done) => {
      chai.request('http://localhost:8080/')
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          expect(err).to.be.null;
          done();
        });
    });
    it("checks server", (done) => {
      chai.request('http://localhost:8080/')
        .get("*")
        .end((err, response) => {
          response.should.have.status(200);
          expect(err).to.be.null;
          done();
        });
    });
  describe("POST /api/log",  () => {
    it("checks log", (done) => {
      chai.request('http://localhost:8080/')
        .post("/api/log")
        .end((err, res, body) => {
          res.should.have.status(200);
          expect(logger).to.equal('OK');
        done();  
        });
    });
    const userCreated = {
      message_type: "text", 
      password: "passwordtest", 
      options: "none"
    };
    it("checks POST /api", (done) => {
      chai.request('http://localhost:8080/')
        .post("/api")
        .send(userCreated)
        .end((request, response) => {
          //expect(response.password).to.eql("passwordtest");
          expect(response).to.have.status(200);

          done();  
        });
    });
    it("checks POST /api/nlu", (done) => {
      chai.request('http://localhost:8080/')
        .post("/api/nlu")
        .end((err, response) => {
          response.should.have.status(200);
          expect(err).to.be.null;
        done();  
        });
    });
   
  });
});*/