//const IbmCloudSecretsManagerApiV1 =  require('@ibm-cloud/secrets-manager/ibm-cloud-secrets-manager-api/v1');
//const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');
const SecretsManager = require('@ibm-cloud/secrets-manager/secrets-manager/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');



var instance = '0e69709e-85f3-1310-0fbc-4e068e6c0410';
var cloud_api_key = 'exeV33qLQ98NUjiczGgltl0YaAME-GA1oY5q3JQkywdt';
var instance_ID = 'https://5f5204c7-80e7-4e4a-8753-541af01a676a.us-south.secrets-manager.appdomain.cloud/api/v1/secrets/username_password/0e7dbc79-bc70-1658-d035-abc23d123039';
console.log(`api key ${cloud_api_key}`);

async function secretsManagerSdkExample() {
  const authenticator = new IamAuthenticator({
    apikey: 'exeV33qLQ98NUjiczGgltl0YaAME-GA1oY5q3JQkywdt',
  });
  const secretsManager = new SecretsManager({
    authenticator,
    serviceUrl:
      'https://5f5204c7-80e7-4e4a-8753-541af01a676a.us-south.secrets-manager.appdomain.cloud/'
  });

  const secretsManagerApi = new SecretsManager({
    authenticator: new IamAuthenticator({
      apikey: `${cloud_api_key}`,
    }),
    serviceUrl: `${instance_ID}`,
  });
  /*
  const params = {
    secretType: 'arbitrary',
    id: `${instance}`,
  };
  
  secretsManagerApi.getSecret(params)
    .then(res => {
      console.log('Get secret:\n', JSON.stringify(result.resources, null, 2));
      })
    .catch(err => {
      console.warn(err)
    }); */

  // Get the ID of the newly created secret
  //const secretId = res.result.resources[0].id;
  const secretId = instance;
  // Use the Secrets Manager API to get the secret using the secret ID
  res = await secretsManager.getSecret({
    secretType: 'arbitrary',
    id: secretId,
  });

  console.log('Get secret:\n', JSON.stringify(res.result.resources, null, 2));
}

secretsManagerSdkExample().catch((err) => {
  console.log('error ' + err);
});