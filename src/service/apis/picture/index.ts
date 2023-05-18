import { request } from '../../index'

interface IQuery {
  category?: number
  tag?: number
  album?: number
  limit?: number
  page?: number
}

export interface IPicture {
  id: number
  title: string
  description: string
  pic: string
  hot: number
  createAt: Date
  categories: Category[]
  tags: Tag[]
  album: any[]
  user: User
}

export interface Category {
  id: number
  name: string
  pic: string
}

export interface Tag {
  id: number
  tagName: string
  pic: string
}

export interface User {
  id: number
  username: string
  avatar: string
}
export const getPictrue = (query: IQuery) => {
  return request<IPicture[]>({
    url: '/pictures',
    data: query,
  })
}

export const searchApi = (_: string, limit: number = 10, page: number = 1) => {
  return request<IPicture[]>({
    url: '/search',
    data: {
      searchKey: _,
      limit,
      page,
    },
  })
}
export interface IPictureDetail {
  id: number
  title: string
  description: string
  pic: string
  hot: number
  createAt: Date
  categories: Category[]
  tags: Tag[]
  user: User
  recommend?: IPictureDetail[]
}

export const getPictureDetail = (id: number) => {
  return request<IPictureDetail>({
    url: `/pictures/${id}`,
  })
}
