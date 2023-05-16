import { useEffect, useState } from 'react'
import { getBanner, getAlbum, IBanner, IAlbum } from '@/service/apis/home/index'
export const useFetch = () => {
  const [banner, setBanner] = useState<IBanner[]>([])
  const [album, setAlnum] = useState<IAlbum[]>([])

  // 页面数据初始化
  useEffect(() => {
    Promise.all([getBanner(), getAlbum({ limit: 2, page: 1 })]).then(
      ([bannerResult, albumResult]) => {
        setBanner(bannerResult.data)
        setAlnum(albumResult.data)
      },
    )
  }, [])

  return {
    banner,
    album,
  }
}
