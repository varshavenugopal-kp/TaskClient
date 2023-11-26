import axios from 'axios'
const BASE_URL=process.env.REACT_APP_BASE_URL;

export const apiAuth=axios.create({
    baseURL:BASE_URL
})
export const api=axios.create({
    baseURL:BASE_URL
})

api.interceptors.request.use(
    (config)=>{
        let token=localStorage.getItem('userInfo')
       
        if(token){
            token=JSON.parse(token)
            token=token.token
        }
            config.headers['token']=token
            
        
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
