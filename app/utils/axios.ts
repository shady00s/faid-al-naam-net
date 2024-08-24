
import axios from "axios"


const instance = axios.create({
    baseURL:  process.env.NODE_ENV === "production"? process.env.BASE_URL :'http://localhost:3000/',
    withCredentials: false,
    
    headers: {
        'Content-Type': 'application/json',
    }
})

const instance2 = axios.create({
    baseURL:   process.env.DASHBOARD_BASE_URL,
    withCredentials: false,
    
    headers: {
        'Content-Type': 'application/json',
    }
})

export  {instance,instance2}