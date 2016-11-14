import axios from 'axios'
import Qs from 'qs'

const server = axios.create({
  baseURL: 'http://localhost:5000',
  responseType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

export default server
