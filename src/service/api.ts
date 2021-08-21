import axios from "axios"


const api = axios.create({
    baseURL: 'https://dev.codeleap.co.uk/careers/'
})

export default api