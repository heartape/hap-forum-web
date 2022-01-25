import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'
import Vue from 'vue'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
const options = {
  customClass: 'request-loading',
  lock: true,
  text: 'Loading . . .'
}

let loadingInstance

const close = function() {
  // 关闭加载图标
  Vue.nextTick(() => {
    loadingInstance.close()
  })
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    loadingInstance = Loading.service(options)

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    close()
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      return Promise.reject(res.message || '未知异常')
    } else {
      return res
    }
  }, error => {
    close()
    return Promise.reject(error.message)
  }
)

export default service
