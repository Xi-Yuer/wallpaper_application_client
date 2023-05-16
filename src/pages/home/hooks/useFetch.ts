import { useEffect, useState } from 'react'
import {
  getBanner,
  getAlbum,
  IBanner,
  IAlbum,
  getTag,
  ITag,
} from '@/service/apis/home/index'
export const useFetch = () => {
  const [banner, setBanner] = useState<IBanner[]>([])
  const [album, setAlnum] = useState<IAlbum[]>([])
  const [tag, setTag] = useState<ITag[]>([])

  // 页面数据初始化
  useEffect(() => {
    Promise.all([
      getBanner(),
      getAlbum({ limit: 2, page: 1 }),
      getTag({ limit: 10, page: 1 }),
    ]).then(([bannerResult, albumResult, tagResult]) => {
      setBanner(bannerResult.data)
      setAlnum(albumResult.data)
      setTag(tagResult.data)
    })
  }, [])

  return {
    banner,
    album,
    tag,
  }
}
