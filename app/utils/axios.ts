
import axios from "axios"


const instance = axios.create({
    //'https://faid-al-naam-server.onrender.com/'
    baseURL:   'http://localhost:3000/',
    withCredentials: false,
    
    headers: {
        'Content-Type': 'application/json',
    }
})

const instance2 = axios.create({
    //'https://faid-al-naam-server.onrender.com/'
    baseURL:   'https://faid-al-naam-server.onrender.com/',
    withCredentials: false,
    
    headers: {
        'Content-Type': 'application/json',
    }
})

export  {instance,instance2}