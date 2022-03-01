
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;


var config = require('./config.json');

var insertDocument = function(db,data, callback) {
  
  db.collection('AnalysisCollection').insertOne( data , function(err, result) {
    //console.log(data);
      assert.equal(err, null);
      console.log("Inserted a document into the collection.");
      callback(result);
  });
   
  }; 

  function insertDoc(db,data){
    return new Promise(resolve => {
      callback=db.collection('AnalysisCollection').insertOne(data).then(function(response,obj){
        console.log("Inserted record"); 
        //console.log(data);
           resolve(data);
        
    }).catch(function(error){
        throw new Error(error);
    });
    })
  }
  



function cosmosDBConnect(nluResultJSON) {
  return new Promise((resolve, reject) => {
      var url = config.cosmos_endpoint;
      var result = '';

      var data = JSON.parse(JSON.stringify(nluResultJSON));

      MongoClient.connect(url, function(err, client) {
        if (err) return reject(err);
        assert.equal(null, err);
        var db = client.db('NLUAnalysisDB');
        insertDoc(db, data).then(obj => {
            //console.log(obj);                      
            client.close();
            resolve(obj._id);
        });           
    });
  });
}

module.exports = { cosmosDBConnect };

