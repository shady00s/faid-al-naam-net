
import axios from "axios"


const instance = axios.create({
    //'https://faid-al-naam-server.onrender.com/'
    baseURL:   'http://localhost:3000/',
    withCredentials: false,
    
    headers: {
        'Content-Type': 'application/json',
    }
})



export default instance