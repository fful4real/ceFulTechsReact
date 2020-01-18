import axios from 'axios'
const AUTH_TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzkzNjQxMTAsImV4cCI6MTU3OTM2NzcxMCwicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJ1c2VybmFtZSI6ImZmdWw0cmVhbCJ9.OsjaOWVCrweK8Xm_qJJCOh5vastmv1tevlm5b_FyuXuV-6IV4jBbhhiAvyYI8dEfxhTwsEpaS_8VcIF7LP-H6u9cEZRfdabohc6RG5TE_KGfITKCEmmYUKn8yTZfJg-wgzb0ujt5yR4IUIvWFdZMnxf1vGNfOHlhC9zHrczt8JJIcZ0rDa7U025QHhKUQO3_ly7wALXNtS_hYGvPDneiSeY6mr24Rr4ryMUq6UslEJpEYG6hHs7__a63Gla_SRIV2cxSrdlY49wLcrX6rdOAowkibZNr0XWm_xTbHxgXFbcT09D7_XgTN4Q4LS_OxkDVcCLueyS_cdfxKAVLSSvHJrpsqIExR4q7nzC4R0Eq1GYxHwTYX-l2Tk_pr0WWI_9RJMTbkHiQT1bq4rbuMdR8JvQqxAvHTpakm1nwUL_xCwd7nesxmbLuwiUYnfSZ1SPH0EJuLSot-XoIXXIK_htieE0FQpPVkLrqxWnHzpqidZp8CWXksQMQB24WVTjDlPW4Xc-lT8JkyzZt_5B5TyEoAO_Gt5gfMxoQ1nDxK0YJ25ekHnh0yzEDsQ4lI2RvrvUjqBpztRvBU_SCuXBtNw9DJ9bYeoumG0usdl1z6SjrS4JKDNqCHhuMnQRYViaABcyEKcUXYopR9A17eS9ER0F2lqgvvRoGRcba7oVJEgOhYFU'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.interceptors.request.use(
    config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
    return {
      ...config,
      headers: {
        Authorization:`Bearer ${AUTH_TOKEN}`
      }
    }
    },
    error => console.error(error)
  );

const AxiosRequest = (method, url, params, data)=>{
  

  return axios({
  method,
  url,
  params,
  data
})}


export default AxiosRequest;