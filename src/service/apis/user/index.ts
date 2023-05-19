import { BASE_URL } from '@/config'
import cache from '@/utils/cache'
import Taro from '@tarojs/taro'
import { request } from '../../index'
import { getPictureDetail, IPicture } from '../picture'

export const register = (username: string, password: string) => {
  return request({
    url: '/auth/registry',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}
export const login = (username: string, password: string) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}

export const updataUser = (userId: number, { username, password }) => {
  let info: any = {}
  if (username) {
    info.username = username
  }
  if (password) {
    info.password = password
  }
  if (username && password) {
    info = {
      username,
      password,
    }
  }
  return request({
    url: `/users/${userId}`,
    method: 'PUT',
    data: {
      ...info,
    },
  })
}

export const updateUserAvatar = (id: number, file: any) => {
  return new Promise((resovle, reject) => {
    Taro.showLoading()
    Taro.uploadFile({
      url: BASE_URL + `/users/avatar/${id}`,
      filePath: file,
      name: 'file',
      header: {
        Authorization: cache.get('TOKEN'),
        'content-type': 'application/form-data',
      },
      success(res) {
        resovle(res)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        Taro.hideLoading()
      },
    })
  })
}

export const getUserFavor = (page = 1) => {
  return request<any>({
    url: `/favor`,
    data: {
      page,
    },
  })
}
export const getUserDownload = (page = 1) => {
  return request<IPicture[]>({
    url: `/download`,
    data: {
      page,
    },
  })
}

export const addFavor = (id: number) => {
  return request({
    method: 'POST',
    url: `/favor/${id}`,
  }).then((res: any) => {
    Taro.showToast({
      title: res.data,
      icon: 'none',
    })
  })
}
export const delFavor = (id: number) => {
  return request({
    method: 'POST',
    url: `/favor/${id}`,
  }).then((res: any) => {
    Taro.showToast({
      title: res.data,
      icon: 'none',
    })
  })
}

export const download = (id: number) => {
  Taro.showLoading()
  getPictureDetail(id).then((res: any) => {
    request({
      method: 'POST',
      url: `/download/${id}`,
    })
      .then(async (result) => {
        console.log(result)
        if (result.statusCode === 401) {
          Taro.showToast({
            title: '请先登录哦',
            icon: 'error',
          })
          return
        }
        Taro.hideLoading()
        const { path } = await Taro.getImageInfo({ src: res.data.pic })
        Taro.saveImageToPhotosAlbum({
          filePath: path,
          success() {
            Taro.showToast({
              title: '保存成功',
            })
          },
        })
      })
      .finally(() => {
        Taro.hideLoading()
      })
  })
}
