import axios from 'axios'
const AUTH_TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzkzNjAyNzUsImV4cCI6MTU3OTM2Mzg3NSwicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJ1c2VybmFtZSI6ImZmdWw0cmVhbCJ9.n1uMBFtkrNw9oenebMtPW3JrJSBxsDFIyKw-7Txpp-wPP9WeSzeF_hwIu0seKpVdXCmRBjADUwAINELsgKMlO8zlUOrvvyC7MyatvWZCt0izJw1gT1Wrx4dct5PXsT6-utwd5vwJUrZ8ICM3hjF0T6pvwDveyxG9lNLba-L41TB14KlFJ5CjppGqZDvAYwq3OwpqxZxmHCKp3PDCLCexMjVtuK3fBis4cef4T4Gxxp8bX7KzBXW4ZHQ2YFBlqBJw42tE0Al9r79GMJb6VuqRghNJk1meFSLof-KSAk4OzRhcBk7GPlMorQVaXmFlQx1hWMNpynVHTcXkZxajsRaI4uQm0jr2UcLE-Fk9C_kbt-4zIxrM7bMp4cgDwXSvrfmkRqQ0W3yNgsU2en57cKoQacCf7rP-_4G6cHqkBSHwaus3DmegMilBAuCpA4rNDtQFPTBgY2Gpxuy8ReMjDaGPSgqtwryTtY6vqC93T2Poc2-y4rWtC5xUZ_nwil4E44IAVncbLiRl1MaE5pXDEsPUwY3X_pmT00TDq6vJYb_BN13Mk7NOuPeevnCkhAChn2Pi_72_iZ_PuzTuREuLOEC3la_XZ6AnO0mvLE_kZzGbvYM1w3ogfaqbucSMIRd2zs1jfXbnIc5h_F8AI3JnhBSq_W7jfNV2ED7W_PU6w8nV6mU'

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