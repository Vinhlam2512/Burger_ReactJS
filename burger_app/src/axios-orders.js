import axios from "axios";


const instance = axios.create({
    baseURL: 'https://my-burger-reactapp-bf655-default-rtdb.firebaseio.com/'
})

export default instance;