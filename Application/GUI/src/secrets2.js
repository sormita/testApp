const SecretsManager = require('@ibm-cloud/secrets-manager/secrets-manager/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');


async function secretsManagerSdkExample() {
  // Authenticate with IAM using your IBM Cloud API key
  const authenticator = new IamAuthenticator({
    apikey: 'exeV33qLQ98NUjiczGgltl0YaAME-GA1oY5q3JQkywdt',
  });

  // Create an instance of the SDK by providing an authentication mechanism and your Secrets Manager instance URL
  const secretsManager = new SecretsManager({
    authenticator,
    serviceUrl:
      'https://5f5204c7-80e7-4e4a-8753-541af01a676a.us-south.secrets-manager.appdomain.cloud/'
  });

  // Use the Secrets Manager API to create a secret
  let res = await secretsManager.createSecret({
    secretType: 'username_password',
    'metadata': {
      'collection_type': 'application/vnd.ibm.secrets-manager.secret+json',
      'collection_total': 1,
    },
    'resources': [
      {
        'name': 'example-username-password-secret',
        'description': 'Extended description for this secret.',
        'username': 'user123',
        'password': '123456789',
        'labels': ['label1', 'label2'],
        'expiration_date': '2030-04-01T09:30:00Z',
      },
    ],
  });

  console.log('Secret created:\n' + JSON.stringify(res.result.resources[0], null, 2));

  // Get the ID of the newly created secret
  const secretId = res.result.resources[0].id;

  // Use the Secrets Manager API to get the secret using the secret ID
  res = await secretsManager.getSecret({
    secretType: 'username_password',
    id: secretId,
  });

  console.log('Get secret:\n', JSON.stringify(res.result.resources, null, 2));
}

secretsManagerSdkExample().catch((err) => {
console.log('error ' + err);
}) ;