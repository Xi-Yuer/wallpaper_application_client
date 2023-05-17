import { View, Text, Image } from '@tarojs/components'
import { PullRefresh } from '@taroify/core'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { getAlbum, IAlbum } from '@/service/apis/home'
import Theme from '@/components/theme/index'
import SearchBar from '@/components/search'
import WSkeleton from '@/components/skeleton'
import BackTopBar from '@/components/back-top'

import styles from './index.module.scss'

const Album = () => {
  const [album, setAlbum] = useState<IAlbum[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    fetchAlbum()
  }, [])

  const fetchAlbum = (limit = 20, page = 1) => {
    getAlbum({ limit, page })
      .then((res) => {
        setAlbum(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onRefresh = () => {
    setLoading(true)
    fetchAlbum()
    setHasMore(true)
    setCurrentPage(1)
  }

  useReachBottom(() => {
    if (!hasMore) return
    setCurrentPage(currentPage + 1)
    getAlbum({ limit: 20, page: currentPage + 1 })
      .then((res) => {
        if (res.data.length) {
          setAlbum([...album, ...res.data])
        } else {
          setHasMore(false)
        }
      })
      .catch(() => {
        setHasMore(false)
      })
  })

  const navToAlbumDetailPage = (id) => {
    Taro.navigateTo({
      url: `/subpages/album-detail/index?id=${id}`,
    })
  }
  return (
    <View className={styles.album_wrapper}>
      <SearchBar isBack />
      <PullRefresh
        onRefresh={onRefresh}
        loading={loading}
        style={{ flex: '1' }}
      >
        <View className={styles.album}>
          {album &&
            album.map((_) => (
              <View
                key={_.id}
                className={styles.album_images}
                onClick={() => navToAlbumDetailPage(_.id)}
              >
                <Image src={_.pic} mode='aspectFill'></Image>
                <Text className={styles.title}>{_.title}</Text>
              </View>
            ))}
          <WSkeleton
            config={{
              width: '45vw',
              height: '180rpx',
              col: 2,
              row: 10,
              gap: 20,
              loading: !!!album.length,
            }}
          />
        </View>
      </PullRefresh>
      <BackTopBar />
    </View>
  )
}

export default Theme(Album)
