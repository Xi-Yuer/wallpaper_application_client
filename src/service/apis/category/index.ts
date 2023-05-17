import { request } from '../../index'
import { ITag } from '../home'
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
