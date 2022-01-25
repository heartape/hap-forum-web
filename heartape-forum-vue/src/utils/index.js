import Vue from 'vue'
import { Loading, Notification } from 'element-ui'

export function error(message) {
  Notification.error({
    title: '请求失败',
    message: message
  })
}

const options = {
  lock: true,
  text: 'Loading . . .'
}
let loadingInstance

export function open() {
  loadingInstance = Loading.service(options)
}

export function close() {
  // 关闭加载图标
  Vue.nextTick(() => {
    loadingInstance.close()
  })
}
