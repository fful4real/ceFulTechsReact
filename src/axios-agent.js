import axios from 'axios'
const AUTH_TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzkzMTk2MDgsImV4cCI6MTU3OTMyMzIwOCwicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJ1c2VybmFtZSI6ImZmdWw0cmVhbCJ9.dsNhfNLxrYu9jDR2WBKXUpyyqkzxBTsj-TardXSd6QNqN-54StL3VT2FTVcr2KPnKGgwK_M3fHXoqc5f_s47WenPvw80FdlaZIFmRAhibE9dE8TH19q1pjcSQ0ymEMLBxaU8bOKQZofL4nccIi03onQt8W6FnsD-9L2RrXdFUPMbibaM78kdOlCYeln-QImJMPD9fI68jzEDdiLBaUk5Mwo84fF48eupT3rt0FEjdbg4oginxpzWCkaVlNCyGDM5MdsEa_wBR2Q97opgxx42F02SkzukE4pyNTUrILjxOtg4IBt0d4ECxSBK0Bu_RICw8CxiI9_ttCyJEIEIqa6Gpju326XLRw8q_v3VETVGhNDqG5iF73Vv0boSswWwGh8BDYOSJ5oRh_Bo0N6qcH7abcs9xqJ-SJFrDxTtypQjSLDZJUD9MKX_GXbfDHbDiSWCNKpr0ZI_wFxsWG4I7WON2LBHPibJaPsJShm4UryZR2nMF7xkX4lgDcnZcH8YBvWdpnJc-f_1hiJ588F95KBQxgRRBvjX-8xZnjKoNXj0a5JlUmnEw1gX4EK8S2U2v6MJg5QUKfbH3_tqI-Vnrfx1DAEZ1R_3yQ27pwRVQFAZUK-AIgOksdxZY5hHOngnzdl5cBH2xMM7o6YYOiImTvt2GIuZ8z6Op3Do2PtLn8LLkeU'

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