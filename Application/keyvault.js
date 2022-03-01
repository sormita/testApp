var http = require('http');
const {ClientSecretCredential} = require('@azure/identity');
const {SecretClient} = require('@azure/keyvault-secrets');
// const {KeyVaultCredentials} = require('@azure/keyvault-secrets');
// const {KeyVault} = require('azure-keyvault');
//const {AuthenticationContext} = require('adal-node');

var config = require('./config.json');

// ManagedIdentityCredential created by "identity assign" command
//const credential = new ManagedIdentityCredential();

// Replace value with your Key Vault name here
const vaultName = "metlifepockeyvault";
const url = `https://${vaultName}.vault.azure.net`;
  
//const client = new SecretClient(url, credential);

// Replace value with your secret name here
const secretName = "nluAPIkey";
const tenantID = config['key-vault-tenantID'];
const clientID = config['key-vault-clientID'];
const clientKey = config['key-vault-password'];
const vaultname = config['key-vault-vaultname'];

 //let keyVaultCredentials = new KeyVaultCredentials(createAuthenticator(clientID, clientKey));
 //let keyVaultClient = new KeyVaultClient(keyVaultCredentials);

//  function createAuthenticator(clientID, clientKey){
//     return (challenge, callback) => {
//     let context = new AuthenticationContext(challenge.authorization);
//     return context.acquireTokenWithClientCredentials(
//         challenge.resource,
//         clientID,
//         clientKey,
//         function (err, tokenResponse) {
//             if (err) {
//                 CLogger.log("error", "Error occurred while acquiring token with key vault credentials: " + JSON.stringify(err));
//                 throw new Error("Error occurred while acquiring token with key vault credentials. Check log files");
//             }
//             if(tokenResponse){
//                 console.log("Inside token");
//                 console.log(tokenResponse);
//                 let authorizationValue = (tokenResponse).tokenType + " " + (tokenResponse).accessToken;
//                 return callback(null, authorizationValue);
//             }
//         });
//     }
//   }

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    async function main(){
        
        const credential = new ClientSecretCredential(
            "89fa63d9-3840-48c6-8536-28ede41ebd11", //tenant id
            "b5e7c1ef-9aca-491e-b097-090ed30783c9", //client id
            "LbG7Q~3dNBY1ZqVJ3YeuWBpBJDxU2Mn3HqCQY" //secret
          );

        var client = new SecretClient(url,credential);

        // Get the secret we created
        const secret = await client.getSecret(secretName);
        response.write(`Your secret value is: ${secret.value}`);
        response.end();
    }
    main().catch((err) => {
        response.write(`error code: ${err.code}`);
        response.write(`error message: ${err.message}`);
        response.write(`error stack: ${err.stack}`);
        response.end();
    });
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);