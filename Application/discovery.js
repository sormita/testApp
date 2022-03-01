const DiscoveryV2 = require('ibm-watson/discovery/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV2({
  version: '2020-08-30',
  authenticator: new IamAuthenticator({
    apikey: 'Icmo4X4qLWy2Oaxc6xDabwM2nzVQsGTPCielELdXCa6S',
  }),
  serviceUrl: 'https://api.us-south.discovery.watson.cloud.ibm.com/instances/7b658dc7-974a-4d14-aeb3-83f853e4d7a3',
});

const params = {
  projectId: 'efa70ae1-7f01-4f6f-a659-826af2c63f52',
  //query: '{field}:{value}',
  query:  '1',
};

discovery.query(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });

