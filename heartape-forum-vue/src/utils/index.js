import Vue from 'vue'
import { Loading, Notification } from 'element-ui'

export function error(message) {
  Notification.error({
    title: '请求失败',
    message: message,
    offset: 70
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

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  } // 月份 // 日 // 小时 // 分 // 秒 // 季度 // 毫秒
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return fmt
}
