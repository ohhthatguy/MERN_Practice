import axios from 'axios'
import { sample_url } from './ApiMessages'

const API_URL = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,     //10 sec into milisecond
    headers:{
       
    } 
})


axiosInstance.interceptors.request.use(
    function (config){ //this function activates when request( from frontend) is successful
        return config
    },
    function (err){  //this function activates when request( from frontend) fails
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    function (response){ //this function activates when response( from backend) is successful
        
        // return  {isSuccess: true, data: response.data}
        return sucessfullResponse(response)
     
    },
   
    function (error){  //this function activates when response( from backend) fails
        // return Promise.reject(failedResponse(err))
        if (error.response) {
            // Server responded with a status other than 2xx
            return Promise.reject({
                isSuccess: false,
                msg: error.response.data.message || 'Error occurred while fetching response from server',
                code: error.response.status,
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                isSuccess: false,
                msg: 'No response received from server',
                code: 500,
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject({
                isSuccess: false,
                msg: error.message,
                code: 500,
            });
        }
    }
    
)

const sucessfullResponse = (response) =>{
    console.log("successfull in response")

    if(response?.status === 200){ //response could be null/undefined
        return {isSuccess: true, data: response.data}
    }else{
        return {isSuccess: false, status: response?.status, msg: response?.msg, code: response?.code}
    }
}



const API = {}

//API[key] is dynamically creating a new property in the API object. The property name is determined by the key from the service_urls object.

for(const [key,value] of Object.entries(sample_url)){
    API[key] = (body) => {
        // console.log(`Making request to ${axiosInstance.defaults.baseURL}${value.url}`);
        return axiosInstance({ 
            method: value.method,
            url: value.url,
            data: body
    
        })
    }
}
                    

export {API}
