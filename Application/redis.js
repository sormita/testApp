const redis = require('redis');
const config = require('./config.json');
const redis_client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});
var http = require('http');

// const { promisify } = require('util');
// const setAsyncEx = promisify(client.setex).bind(client);
// const getAsync = promisify(client.get).bind(client);

// client.on('error', err => {
//     console.log('Error ' + err);
// });

// async function saveWithTtl(key, value, ttlSeconds = 60) {
//   return await setAsyncEx(key, ttlSeconds, JSON.stringify(value)); 
// }

// async function get(key) {
//   const jsonString = await getAsync(key);

//   if (jsonString) {
//     return JSON.parse(jsonString);
//   }
// }

// module.exports = {
//   saveWithTtl,
//   get
// }

//const client = redis.createClient(6379);

function sampleRequest(){
    return new Promise(resolve =>{
 
        var options = {
            host: 'api.plos.org',
            path: '/search?q=title:DNA',
            method: 'GET'
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
//request.write();
request.end();
      

    });
    
}

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    async function main(){
        

        //log error to the console if any occurs
        redis_client.on("error", (err) => {
          console.log(err);
        });

        await redis_client.connect();

    var result= await sampleRequest();
    var resultJSON=JSON.stringify(result);
    console.log(result);
    console.log(resultJSON);
    redis_client.SETEX('/search?q=title:DNA',600,resultJSON);
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