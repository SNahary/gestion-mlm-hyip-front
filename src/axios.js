import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3033'
})

export default instance