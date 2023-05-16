import { request } from '../../index'

interface IQuery {
  category?: number
  tag?: number
  album?: number
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
