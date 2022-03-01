const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

apikey = 'pXH6pykDYtV3brIndbIur6_V5JLQLLspZb-3fop6AQld';
url = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/f3e2d017-9ae1-4635-aaa3-f96e1ee58422';
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: `${apikey}`,
  }),
  serviceUrl: `${url}`,
});

const analyzeParams = {
  'url': 'www.ibm.com',
  'features': {
    'categories': {
      'limit': 3
    }
  }
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
