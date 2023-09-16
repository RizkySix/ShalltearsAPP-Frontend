import axios from "axios"

const http = () => {

    let options = {
        baseURL: 'https://shalltears.cloud',
        headers: {}
    }

    if(localStorage.getItem('token')){
        options.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }

    return axios.create(options)
}

export default http