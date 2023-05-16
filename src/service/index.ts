import Taro from '@tarojs/taro'
import { BASE_URL, TIME_OUT } from '../config/index'
import { IConfig, IResponse } from './types'
import cache from '../utils/cache'

export const request = <T>({
  url,
  method = 'GET',
  data,
}: IConfig): Promise<IResponse<T>> => {
  const token = cache.get('TOEKN') || ''
  return new Promise((resolve, reject) => {
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
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
