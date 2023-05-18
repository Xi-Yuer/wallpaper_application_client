import { request } from '../../index'

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
