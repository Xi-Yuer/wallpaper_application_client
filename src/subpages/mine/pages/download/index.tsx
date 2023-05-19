import BackTopBar from '@/components/back-top'
import WSkeleton from '@/components/skeleton'
import { navToPictureDetailPage } from '@/hooks/navToPictureDetail'
import { getUserDownload } from '@/service/apis/user'
import { Empty, PullRefresh } from '@taroify/core'
import { View, Image } from '@tarojs/components'
import { useReachBottom } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'

import styles from './index.module.scss'

const Index = memo(() => {
  const [pictureList, setPictureList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (!hasMore) return
    getUserDownload(page).then((res) => {
      setPictureList([...pictureList, ...res.data])
      if (!res.data.length) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    })
  }, [page])
  const onRefresh = () => {
    setLoading(true)
    setPage(1)
    getUserDownload(1)
      .then((res) => {
        setPictureList(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useReachBottom(() => {
    setPage(page + 1)
  })
  console.log('pictureList', pictureList)
  return (
    <View className={styles.wrapper}>
      <PullRefresh loading={loading} onRefresh={onRefresh}>
        {pictureList.length > 0 ? (
          <View className={styles.pictures}>
            {pictureList &&
              pictureList.map(
                (_) =>
                  _.pic[0]?.pic && (
                    <Image
                      src={_.pic[0]?.pic}
                      key={_.id}
                      mode='widthFix'
                      onClick={() => navToPictureDetailPage(_.pic[0].id)}
                    ></Image>
                  ),
              )}
            <WSkeleton
              config={{
                width: '45vw',
                height: '380rpx',
                col: 2,
                row: 10,
                gap: 10,
                loading: !!!pictureList.length,
              }}
            />
          </View>
        ) : (
          <View className={styles.center}>
            <Empty>
              <Empty.Image src='search' />
              <Empty.Description>暂无结果</Empty.Description>
            </Empty>
          </View>
        )}
      </PullRefresh>
      <BackTopBar />
    </View>
  )
})

export default Index
