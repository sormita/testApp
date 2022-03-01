/* eslint-disable no-unused-expressions */
import fetch from "unfetch";




// REACT_APP_API can be one of "remote", "local", or "mock"
// If not specified, default to "local" when running locally, "remote" otherwise.
const loc = window.location;
const apiType = process.env.REACT_APP_API || "mock"; //(loc.hostname === "localhost" ? "local" : "remote");
const apiLoc = loc.hostname === "localhost" ? "local" : "remote";

//TODO Barry - see the logic above and below for detecing a "local" install of the app

console.log("API JS apiType =>" + apiType + ' API JS apiLoc=>' + apiLoc + "hostname->" + `${loc.hostname}`);
const baseUrl =
  apiLoc === "local"
    ? `${loc.protocol}//${loc.hostname}:8080/api`
    : `${loc.protocol}//${loc.hostname}/api`;
const modelUrl =
  apiLoc === "local"
    // note: the api for local is NOT https, but http
    ? `http://${loc.hostname}:8081/api/cluster`
    : "https://tonye1-model-api.us-south.cf.appdomain.cloud/api/cluster";

const real = {
  postLogin: ({ username, password }) => fetchJson("/login", postJson({ username, password })),
  getLogout: () => fetchJson("/logout"),
  getUser: () => fetchJson("/user"),
  getRedirect: () => fetchJson("/success"),
  getLog: (message) => fetchJson("/log"),
  getHello: (user) => fetchJson("/hello"),
  getCluster: (user) => fetchJson("/cluster"),
};

const userKey = "mock.api.user";
const docKey = "mock.api.document";


const mock = {
  postLogin: ({ username, password }) => {
    return delay().then(() => {

      if (username && password === "watson4all") {
        var demographics = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
        const user = { username: "jane1", name: 'Jane', role: "auditor", policy: "8675309", demographics: "[19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]", cluster: 1 };
        storage.setItem(userKey, user);
        getLog("user " + user.name + " logged in");
        return {
          success: true,
          message: "Login successful",
          user
        };
      }
      if (username && password === "watson4jane") {
        var demographics = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
        const user = { username: "jane2", name: 'Jane', role: "auditor", policy: "8675309", demographics: "[19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]", cluster: 1 };
        storage.setItem(userKey, user);
        getLog("user " + user.name + " logged in");
        return {
          success: true,
          message: "Login successful",
          user
        };
      }
      if (username && password === "watson4john") {
        var demographics = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
        const user = { username: "john", name: "John", role: "viewer", policy: "2235179", demographics: "[33.0, 23.0, 0.0, 21984.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0]", cluster: 2 };
        storage.setItem(userKey, user);
        getLog("user " + user.name + " logged in");
        return {
          success: true,
          message: "Login successful",
          user
        };
      }
      if (username && password === "watson4boris") {
        var demographics = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
        const user = { username: "boris", name: "Boris", role: "admin", policy: "3002020", demographics: "[61.0, 29.0, 0.0, 29141.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0]", cluster: 3 };
        storage.setItem(userKey, user);
        getLog("user " + user.name + " logged in");
        return {
          success: true,
          message: "Login successful",
          user
        };
      }
      if (username && password === "watson4dan") {
        var demographics = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
        const user = { username: "dan", name: "Dan", role: "viewer", policy: "3002021", demographics: "[61.0, 29.0, 0.0, 29141.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0]", cluster: 3 };
        storage.setItem(userKey, user);
        getLog("user " + user.name + " logged in");
        
        return {
          success: true,
          message: "Login successful",
          user
        };
      }
      if (username && password === "watson4natasha") {
        var demographics = [19.0, 28.0, 0.0, 16885.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
        const user = { username: "natasha", name: "Natasha", role: "approver", policy: "3002021", demographics: "[61.0, 29.0, 0.0, 29141.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0]", cluster: 3 };
        storage.setItem(userKey, user);
        getLog("user " + user.name + " logged in");
        
        return {
          success: true,
          message: "Login successful",
          user
        };
      }
      if (password === "oops") {
        throw responseError();
      }
      throw responseError(401, "Unauthorized");
    });
  },
  getLogout: () => {
    return delay().then(() => {
      storage.removeItem(userKey);
      storage.removeItem("fileName");
      storage.removeItem("fileSize");

      getLog("logging out");
      return { sucess: true, message: "Logout successful" };
    });
  },
  getRedirect: () => {
    return delay().then(() => {
      storage.removeItem(userKey);
      return { sucess: true, message: "Logout successful" };
    });
  },
  getUser: () => {
    return delay().then(() => {
      const user = storage.getItem(userKey);
      if (user != null) {
        return user;
      }
      throw responseError(401, "Unauthorized");
    });
  },



};

const current = apiType === "mock" ? mock : real;

export const postLogin = current.postLogin;
export const getLogout = current.getLogout;
export const getUser = current.getUser;
export const getRedirect = current.getRedirect;

// Real

const defaultOptions = { mode: "cors", credentials: "include" };

export function getLog(message) {
  const options = defaultOptions;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var time = today.getTime()
  var submittedDate = JSON.stringify(mm + '/' + dd + '/' + yyyy + ':' + time + ' ').replace(/\"/g, "");
  console.log("getLog baseurl" + baseUrl + "/log" + "message is" + message);
  const postUrl = baseUrl + "/log";
  return fetch(postUrl, {
    method: 'POST',
    //body: JSON.stringify({'post':message,}),
    body: JSON.stringify({ 'Log Event': submittedDate + message, }),
    headers: { 'Content-Type': 'application/json', },
    mode: "cors",
    credentials: "omit"
  })

    .then(({ status }) => {
      console.log("getLog status" + JSON.stringify({ status }));
      //return { data: json, status: status };
      return status;
    })
    .catch((e) => {
      console.log(`An error has occured while calling the Log API. ${e}`);
      //reject(e);
    });


}


export function postNLU(file){
  const postUrl = baseUrl + "/nlu";
  var formData = new FormData();
	formData.append('formData', file);

  return fetch(postUrl, {
    method: 'POST',    
    body: formData,
    //headers: { 'Content-Type': 'multipart/form-data','Accept': '*/*' },
    mode: "cors",
    credentials: "omit"
  })
  .then(res => res.text())          // convert to plain text
  .then(text => {
    console.log("Inside api.js text:",text);
    var JSONObject = JSON.parse(text);
    var entitiesJSON = JSONObject["entities"];
    console.log("entities:",entitiesJSON);
    
    var terms= [];
      
    for(var i = 0; i < entitiesJSON.length; i++) {
      terms[i] = entitiesJSON[i].text;
      console.log("nlu terms:",terms[i]);  
  }
  storage.setItem("nluEntities", JSON.stringify(terms));
  
  var nlu=JSON.parse(storage.getItem("nluEntities"));


  for(var i = 0; i < nlu.length; i++) {
    console.log(nlu[i]);
    //analysis.terms[i]=nlu[i];
      
}


    return entitiesJSON;
  })
    .then(({ status }) => {
      //console.log("getLog status" + JSON.stringify({ status }));
      //return { data: json, status: status };
      console.log(status);
    })
    .catch((e) => {
      console.log(`An error has occured while calling the Log API. ${e}`);
      //reject(e);
    }); 
}

export function getHello(user) {
  console.log("getHello input" + JSON.stringify(user));
  //this.setState({ isLoading: true });
  const options = defaultOptions;

  return fetch(baseUrl + "/hello", options)
    .then((response) => {
      console.log("getHello response" + JSON.stringify(response));
      return response;
    })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        json
      })
      ))
    .then(({ status, json }) => {
      console.log("getHello status json" + JSON.stringify({ status, json }));
      //return { data: json, status: status };
      return json;
    })
    .catch((e) => {
      console.log(`An error has occured while calling the API. ${e}`);
      //reject(e);
    });
  /* return fetch('http://localhost:8080/api/hello')
     .then(response => response.text()
       .then(text => ({ status: response.status, data: text }) )
     ) */

}

function fetchJson(path, options = defaultOptions) {
  return fetch(baseUrl + path, options).then(response => {

    if (!response.ok) {
      const err = new Error(response.statusText);
      err.response = response;
      err.status = response.status;
      throw err;
    }
    return response.json();
  });
}

function postJson(body = {}, options = defaultOptions) {
  return Object.assign({}, options, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
}

export function getCluster(user) {
  console.log("getCluster input" + JSON.stringify(user) + " using Model URL ->" + modelUrl);
  //this.setState({ isLoading: true });
  const options = defaultOptions;

  return fetch(modelUrl, {
    method: 'POST',
    body: JSON.stringify({ 'post': user.demographics, }),
    headers: { 'Content-Type': 'application/json', },
    mode: "cors",
    credentials: "omit"
  })
    .then((response) => {
      console.log("getCluster response" + JSON.stringify(response));
      return response;
    })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        json
      })
      ))
    .then(({ status, json }) => {
      console.log("getCluster status json" + JSON.stringify({ status, json }));
      //return { data: json, status: status };
      return json;
    })
    .catch((e) => {
      console.log(`An error has occured while calling the API. ${e}`);
      //reject(e);
    });


}

// Mock

function delay(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function responseError(status = 500, message = "Oops!") {
  const err = new Error(message);
  err.response = { status };
  err.status = status;
  return err;
}


const backingStorage = window.sessionStorage;

const storage = {
  getItem: key => {
    try {
      const value = backingStorage.getItem(key);
      return value != null ? JSON.parse(value) : undefined;
    } catch (err) {
      console.error(err);
    }
  },
  setItem: (key, value) => {
    try {
      backingStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  },
  removeItem: key => {
    try {
      backingStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
};