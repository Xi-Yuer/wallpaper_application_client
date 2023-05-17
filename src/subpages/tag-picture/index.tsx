import WSkeleton from '@/components/skeleton'
import { getPictrue, IPicture } from '@/service/apis/picture'
import { PullRefresh } from '@taroify/core'
import { View, Image } from '@tarojs/components'
import Taro, { useLoad, useReachBottom } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import styles from './index.module.scss'

const TagPicture = memo(() => {
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [id, setId] = useState()
  const [list, setList] = useState<IPicture[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  useLoad((options) => {
    setId(options.id)
    Taro.setNavigationBarTitle({
      title: options.title,
    })
  })

  useEffect(() => {
    if (!id) return
    getPictrue({
      limit,
      page,
      tag: id,
    }).then((res) => {
      if (!res.data.length) {
        setHasMore(false)
      }
      setList([...list, ...res.data])
      setLoading(false)
    })
  }, [id, limit, page])

  useReachBottom(() => {
    if (!hasMore) return
    setPage(page + 1)
  })

  const onRefresh = () => {
    setLoading(true)
    setHasMore(true)
    setPage(1)
    getPictrue({
      limit,
      page: 1,
      tag: id,
    })
      .then((res) => {
        setList(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <View>
      <PullRefresh onRefresh={onRefresh} loading={loading}>
        <View className={styles.content}>
          {list &&
            list.map((_) => (
              <Image
                src={_.pic}
                key={_.id}
                className={styles.item_image}
                mode='widthFix'
              ></Image>
            ))}
          <WSkeleton
            config={{
              width: '340rpx',
              height: '500rpx',
              col: 2,
              row: 5,
              gap: 10,
              loading: !!!list.length,
            }}
          />
        </View>
      </PullRefresh>
    </View>
  )
})

export default TagPicture
