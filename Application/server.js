//put this file in /server
const express = require('express');
const logger = require('./logger');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: '/tmp/uploads' });
const utils = require('./utility');
var env_config = require('./env_config');

/*
///////////////Shifted to config.json///////////////////////

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
apikey = 'pXH6pykDYtV3brIndbIur6_V5JLQLLspZb-3fop6AQld';
nlu = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/f3e2d017-9ae1-4635-aaa3-f96e1ee58422';
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: `${apikey}`,
 }),
 serviceUrl: `${nlu}`,
});


 

const analyzeParams = {
  'url': 'https://formswift.com/request-for-proposal',
  'features': {
    'categories': {
      'limit': 3
    },
    "concepts": { 'limit': 3 },
    "entities": {},
    "keywords": {}
  }
};
*/

// create application/json parser
var jsonParser = bodyParser.json()

//var login = require('./routes/loginroutes');
//var upload = require('./routes/fileroutes');
console.log("DIRNAME" + __dirname);

const app = express();
app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
const port = process.env.PORT || 8080;
const { spawn } = require('child_process')
// API calls

// TODO Barry - this page controls the API backends...also good place to init Kafka 
app.get('/api/hello', (req, res) => {
  console.log('Got your hello  !!!!! ');
  logger.log('info', 'called api hello on server');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/cluster', (req, res) => {
  console.log('Server.js: hi from cluster');
  logger.log('info', 'called get cluster on server' + req.query.user);
  var x;
  
  console.log("CLUSTER req->"  + req.query.user);
  let resultDataSet = [];
  //modelInputJSON = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
  modelInputJSON = req.query.user;
  var apiResp;
  const { spawn } = require('child_process')

  const python = spawn('python', ['-u', 'standalone.py', modelInputJSON]);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log(' Pipe data from python script ...');
    resultDataSet.push(data);
  });

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    const clust = resultDataSet.join("");
    console.log("resultDataSet->" + clust)
    res.send({ cluster: resultDataSet.join("") });
    
    
  });
  console.log("GetCluster about to return" + JSON.stringify(apiResp));
  
});

app.post('/api', (req, res) => {
  console.log(' Got your post');
  console.log(req.body);
  res.send(
    JSON.stringify(JSON.stringify({ "input": { "message_type": "text", "text": "testpassword", "options": "none" } }))
  );
});

app.post('/api/nlu', upload.single('formData'), (req,res) => {
  console.log('Got your post for NLU');
  console.log("Inside server.js",req.file);

  // var cloudpakUser=env_config.user_name;
  // console.log("cloudpak user fetched from environment variable ",cloudpakUser);

  utils.NLUAnalysis(req.file.path,req.file.originalname).then(analysisResults => {

     res.send(JSON.stringify(analysisResults, null, 2))
   })
    .catch(err => {
      console.log('error:', err);
    })
  
});



// logging api
app.post('/api/log',jsonParser, (req, res) => {
  console.log('info : LOGGING' + JSON.stringify(req.body))
  logger.log('info', 'LOGGING' + JSON.stringify(req.body));
  res.sendStatus(200);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './GUI/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  console.log(" sending to" + path.resolve(__dirname, './GUI/build', 'index.html'));
  res.sendFile(path.resolve(__dirname, './GUI/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
