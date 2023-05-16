import { request } from '../../index'
import { ITag } from '../home/index'
import { Category } from '../picture'

interface queryTag {
  limit?: number
  page?: number
}
export const getHotTag = (queryTag?: queryTag) => {
  return request<ITag[]>({
    url: '/tags',
    data: {
      limit: queryTag?.limit || 6,
      page: queryTag?.page || 1,
    },
  })
}

export const getHotCateGory = () => {
  return request<Category[]>({
    url: '/category',
    data: {
      limit: 50,
    },
  })
}
