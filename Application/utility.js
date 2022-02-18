const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const { BlobServiceClient } = require('@azure/storage-blob');
var config = require('./config.json');
const cosmosRepo = require('./cosmosRepository');


//Convert pdf to text
async function GetTextFromPDF(filePath) {
    let doc = await pdfjsLib.getDocument(filePath).promise;
    
    var fileContent= "";

    //Stitch all the content in one string
    for(var i=0;i<doc.numPages;i++){
        let page1 = await doc.getPage(1);
        let content = await page1.getTextContent();
        fileContent += content.items.map(function(item) {
            return item.str;
        }) + " ";
    }
    
    return fileContent;
}

function InvokeNLU(textContent){
  return new Promise(resolve =>{
    const api_username=config.api_username;
    const apikey=config.apikey;
    const url = config.nlu_url;  
    const path=config.nlu_api_path;

     //Example where text will be read from a website   
    // var body = JSON.stringify({
    //   "url": "http://newsroom.ibm.com/Guerbet-and-IBM-Watson-Health-Announce-Strategic-Partnership-for-Artificial-Intelligence-in-Medical-Imaging-Liver",
    //   "features": {
    //     "sentiment": {},
    //     "categories": {},
    //     "concepts": {},
    //     "entities": {},
    //     "keywords": {}
    //   }
    // });

    //Example where text is being passed to the API
  var body = JSON.stringify({
    "text": textContent,
    "features": {      
      "entities": {
        "sentiment": true,
        "limit": 8
      }
    }
  });

  var options = { 
    method: 'POST',   
    hostname: url,
    path: path,
    headers: {'Authorization' : 'Basic ' + Buffer.from(api_username + ':' + apikey).toString('base64'),
               'content-type':'application/json'}    
  };

  let https=require('https');
  callback = function(response){
    var str='';

    response.on('data',function(chunk){
        str+=chunk;
    });

    response.on('end',function(){
        obj=JSON.parse(str);
        resolve(obj);
    });
}
let request = https.request(options,callback);
request.write(body);
request.end();
  });
    
}

async function UploadToBlob(filePath,fileName){
    const AZURE_STORAGE_CONNECTION_STRING = config.blob_cs;
    const containerName = config.container_name;
    
    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
   
    // Create a unique name for the blob
    const blobName= fileName;
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log('\nUploading to Azure storage as blob:\n\t', blobName);
    
    const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

}

async function NLUAnalysis(filePath,fileName){
 
  try{
    var fileContent = await GetTextFromPDF(filePath);  
    if(fileContent.length>0){
      var result= await InvokeNLU(fileContent);
      
      //create record in cosmos db
      var resultCosmos= cosmosRepo.cosmosDBConnect(result);

      resultCosmos.then(
        function(data){
          //success callback
          console.log("cosmos data:",data);
          console.log(JSON.stringify(data));
          console.log(fileName);

          fileName = JSON.stringify(data) + "_" + fileName;

          UploadToBlob(filePath,fileName);
        }, 
        function(error){console.log(error)} //failure callback
      );
      
      //return NLU Analysis result back to user
      return result;
    }
    else
    {
      console.log("Error in converting pdf to text");
    }
  }
  catch (e) {        
    console.log(e);
  }  

}

module.exports = { NLUAnalysis };