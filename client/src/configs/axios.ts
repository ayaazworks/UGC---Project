import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL || 'https://ugc-project-production.up.railway.app'
})

export default api;
