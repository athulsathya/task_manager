import axios from "axios"



const url = import.meta.env.VITE_BASE_URL

const axiosInstance=axios.create({
    baseURL:url,               //"http://localhost:4000/api"
    withCredentials:true
})

export default axiosInstance