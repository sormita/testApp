import { getLog  } from "../../../api";
import {storage} from '../utils';

 const getActivityLog=async(username, logEvent) =>{
    console.log('getActivityLog calling');
    var user = storage.getItem("mock-api-user")
    //const result = await resolveCall();
    getLog(" User " + username + " " + logEvent);
    
  }

  export default getActivityLog;