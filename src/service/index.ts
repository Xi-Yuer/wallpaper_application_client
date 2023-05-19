import Taro from '@tarojs/taro'
import { BASE_URL, TIME_OUT } from '../config/index'
import { IConfig, IResponse } from './types'
import cache from '../utils/cache'

export const request = <T>({
  url,
  method = 'GET',
  data,
}: IConfig): Promise<IResponse<T>> => {
  const token = cache.get('TOKEN') || ''
  return new Promise((resolve, reject) => {
    try {
      Taro.request({
        url: BASE_URL + url,
        method,
        data,
        timeout: TIME_OUT,
        header: {
          'content-type': 'application/json',
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.statusCode === 401) {
            Taro.showToast({
              title: res.data.message,
              icon: 'none',
            })
            cache.remove('USER_INFO')
            cache.remove('TOKEN')
          }
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (err) {
      Taro.showToast({
        title: '请求错误，请稍后再试',
        icon: 'none',
      })
      reject(err)
    }
  })
}
