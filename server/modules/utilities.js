import axios from 'axios'


export const AxiosInstance = axios.create({
  timeout: 15000,
  validateStatus : (status)=>{
    return status >= 200 && status < 300
  }
})

export const wrapPromise = (promise)=>{
  return promise
    .then(data=> ([data, null]))
    .catch(err=> ([null, err]))
}

