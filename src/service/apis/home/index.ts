import { request } from '../../index'

export interface IBanner {
  id: number
  albumId: number | null
  pic: string
  tagId: number | null
  type: 'album' | 'tag'
}
export const getBanner = () => {
  return request<IBanner[]>({
    url: '/banner',
  })
}

export interface IAlbum {
  createAt: string
  description: string
  id: number
  pic: string
  title: string
}
interface IQuery {
  limit: number
  page: number
}
export const getAlbum = (query?: IQuery) => {
  return request<IAlbum[]>({
    url: '/album',
    data: query,
  })
}

export interface ICategory {
  id: number
  name: string
  pic: string
}
export interface ITag {
  id: number
  pic: string
  tagName: string
  category: ICategory
}
export const getTag = (query?: IQuery) => {
  return request<ITag[]>({
    url: '/tags',
    data: query,
  })
}

export const getHotTag = (query?: IQuery) => {
  return request<ITag[]>({
    url: '/tags/hot',
    data: query,
  })
}
