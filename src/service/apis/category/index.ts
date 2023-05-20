import { request } from '../../index'
import { ICategory, ITag } from '../home'
export function getCategoryDetail(id: number) {
  return request<ITag[]>({
    url: '/tags',
    data: {
      categoryId: id,
      limit: 100,
      page: 1,
    },
  })
}

export interface Tag {
  tags: ITag[]
}
export function getAllCategory() {
  return request<(ICategory & Tag)[]>({
    url: '/category',
    data: {
      name: '',
    },
  })
}
