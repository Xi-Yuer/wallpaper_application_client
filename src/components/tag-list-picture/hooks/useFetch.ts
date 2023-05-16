import { useReachBottom } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { getTag, ITag } from '@/service/apis/home/index'
import { getPictrue, IPicture } from '@/service/apis/picture/index'

export function useFetch() {
  const [tag, setTag] = useState<ITag[]>([])
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [currentTag, setCurrentTag] = useState<number>()

  const [hasMore, setHasMore] = useState(true)
  const [cache, setCache] = useState({})
  const [pictureList, setPictureList] = useState<IPicture[]>([])

  useEffect(() => {
    if (!currentTag) return
    cache[currentTag] ? setPictureList(cache[currentTag]) : fetchPictrue()
  }, [currentTag])

  const fetchPictrue = async () => {
    try {
      const res = await getPictrue({ tag: currentTag, page: currentPage })
      setCache((preCache) => ({ ...preCache, [currentTag!]: res.data }))
      setPictureList(res.data)
    } catch (error) {
      if (cache[currentTag!]) {
        setPictureList(cache[currentTag!])
      }
    }
  }

  useReachBottom(async () => {
    // 暂无更多数据
    if (!hasMore || !currentTag) return
    setCurrentPage(currentPage + 1)
    const lastData = currentTag ? cache[currentTag] : []
    const res = await getPictrue({ tag: currentTag, page: currentPage + 1 })
    if (!(res.data.length > 0)) {
      setHasMore(false)
    } else {
      setHasMore(true)
      const mergeData = [...lastData, ...res.data]
      setCache((preCache) => ({ ...preCache, [currentTag]: mergeData }))
      setPictureList(mergeData)
    }
  })

  const onRefresh = async () => {
    if (!currentTag) return
    // 发送请求获取第一页数据
    setCurrentPage(1)
    setLoading(true)
    try {
      const res = await getPictrue({ tag: currentTag, page: 1 })
      if (!(res.data.length > 0)) {
        setHasMore(false)
        return
      } else {
        setHasMore(true)
      }
      // 替换缓存中的数据
      setCache((prevCache) => ({ ...prevCache, [currentTag]: res.data }))
      setPictureList(res.data)
    } catch (error) {
      if (cache[currentTag]) {
        setPictureList(cache[currentTag])
      }
    }
    setLoading(false)
  }
  // 切换 tag
  const tabChange = (id: number) => {
    setCurrentTag(id)
    setCurrentPage(1)
    setHasMore(true)
  }

  // 页面数据初始化
  useEffect(() => {
    Promise.all([getTag({ limit: 10, page: 1 })]).then(([tagResult]) => {
      setTag(tagResult.data)
      setCurrentTag(tagResult.data[0].id)
    })
  }, [])

  return {
    tag,
    pictureList,
    currentTag,
    loading,
    tabChange,
    onRefresh,
  }
}
