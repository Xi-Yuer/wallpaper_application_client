import Taro from '@tarojs/taro'
import cache from '@/utils/cache'
import { BASE_URL } from '@/config'
import { request } from '../../index'

export const getUserUpload = (id: number, type: number) => {
  return request<any[]>({
    url: `/upload/${id}`,
    data: {
      type,
    },
  })
}

export const uploadPicture = (file: any, category: number, tag: number) => {
  return Taro.uploadFile({
    url: BASE_URL + '/upload',
    filePath: file,
    name: 'file',
    header: {
      Authorization: cache.get('TOKEN'),
      'content-type': 'application/form-data',
    },
    formData: {
      category,
      tag,
    },
  })
}
