
import axios from "axios"
 
 
 const instance = axios.create({
    baseURL:   process.env.BASE_URL,
    withCredentials: false,
    timeout: 20000,

    headers: {
        'Content-Type': 'application/json',
    }
})

const instance2 = axios.create({
    baseURL:   process.env.DASHBOARD_BASE_URL,
    withCredentials: false,
    timeout: 20000,

    headers: {
        'Content-Type': 'application/json',
    }
})

export  {instance,instance2}