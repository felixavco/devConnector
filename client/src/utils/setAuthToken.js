import axios from 'axios';

const setAuthtoken = token => {
  if(token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token
  } else {
    //Delete Auth header
    delete axios.defaults.headers.common['Authorization']
  }
 
}

export default setAuthtoken;