import axios from 'axios'
// const AUTH_TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1Nzk0MjI0MjQsImV4cCI6MTU3OTQyNjAyNCwicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJ1c2VybmFtZSI6ImZmdWw0cmVhbCJ9.Q70npAeCRwIpvIsi9Agaaok8Aoj980PLegKfz_nIGAwuDfpKayXsfPWhWWt_Up-3zeL2r2VGH4tQ0lWz6s56092daJwECAm6KW-B-seJDE585aqHqvhJ6LcmwUk921P-T34HYsnuAPgj8-oPYhfbdxKSIXCe9a48FEXpSEFVRJ97IDXKINYEwYlDdadw7UW4uAE7YT8UZTHOYHO0YBFTRnds-m4woz9yfM49z0OfcVhEd8ZeI1on9Q0hJ_iWb-31mRPPpMbZVR-OS0ueZi-Z5D8KyeS45lquarR7pf5THAiigX6THiRuaoyDsAOFintuSMoVUaqEK-tbPYYxPaP_VjUcdY7BO954LRdFd0OUPddYUukcdHhBMvj9SIsbMTn7hZQ7WgE_DZ_Qa7t5-ZGn16OS7M-Qa3tk8L5BSKo_c5vdBuqg3aFpuyY0SY7Am6ozD4sfQ-2lOV_GcWN2vIHgew5cOsvQURHhZNh2TInf9wu5PKamehRph37095vYqqMTDsd4oLuSFN6Eo1lOK02xA0A9CaOc04ZjgaVMW1znZO3p9F69CH7iP_QITr4WmNHcvC-sJbE7Gykrq3rYj8QByP8DlfAauMtIjmm3U051BIFp2N6IhSjhjqdNTFnMmHmEItvLbMwdfLIH-0DG66C5n6GGYYdaXfp_-_voP6YLIA8'

axios.defaults.baseURL = 'https://api.olhhs.com/api/'

const AxiosAgent = {
  request: (method, url, params, data)=>{
    return axios({
      method,
      url,
      params,
      data
    })
  },

  setToken: token => axios.interceptors.request.use(
    config => {
      console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
      if (config.headers['content-type']!=="multipart/form-data") {
        config = {...config, data:{...config.data, userId: window.localStorage.getItem('userId')}}
      }
      const contentType = config.method.toUpperCase()==='PATCH'?'application/merge-patch+json':'application/json'
      // console.log(config)
      return {
        ...config,
        headers: {
          Authorization:`Bearer ${token}`,
          "content-type":contentType
        }
    }
    },
    error => console.error(error)

  )
}

export default AxiosAgent;