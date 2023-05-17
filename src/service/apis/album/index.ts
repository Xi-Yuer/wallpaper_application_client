import { request } from '../../index'

export interface IAlbum {
  id: number
  title: string
  description: string
  pic: string
  createAt: string
  user: {
    id: number
    username: string
    avatar: string
  }
  pictures: {
    id: number
    description: string
    title: string
    pic: string
    hot: number
    createAt: string
  }[]
}
export function getAlbumDetail(id: number) {
  return request<IAlbum>({
    url: `/album/${id}`,
  })
}
