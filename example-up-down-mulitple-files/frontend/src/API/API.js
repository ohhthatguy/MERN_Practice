import axios from 'axios'

    const API_OBJECT = {
        saveFormData: {method: 'post', url: '/savePost'},
        saveImage: {method: 'post', url: '/saveImage'}

     
    }
    // getUploadedImage: {method: 'get', url: '/file/:filename'}

    const axiosInstance = axios.create({
        baseURL: "http://localhost:6969",
        timeout: 10000, //i.e. 10 sec into milisec
    })

    axiosInstance.interceptors.request.use(
        function (config){
            return config
        },
        function (err){
            return Promise.reject(err)
        }
    )

    axiosInstance.interceptors.response.use(
        function (response){
            return {isSuccessful: true, data: response.data}
        },
        function (err){
            console.log(err)
                if(err.response){ //
                    return Promise.reject({
                        isSuccessful: false,
                        msg: err.message || 'while fetching data some eroor occured i.e. error in backend',
                        code: err.response.status
                    })

                }else if(err.request){ //
                    return Promise.reject({
                        isSuccessful: false,
                        msg: err.message || 'while sending data some error occured i.e. error in frontend',
                        code: err.request.status
                    })

                }else{ //
                    return Promise.reject({
                        isSuccessful: false,
                        msg: err.message || 'either means some network / connectivity/ other issues',
                        code: 500
                    })
                }


        }

    )

    const API = {}

    for(const[key,value] of Object.entries(API_OBJECT)){
        API[key] = (body)=>{
    
            return axiosInstance({
                method: value.method,
                url: value.url,
                data: body
            })
        }
    }

    export {API}