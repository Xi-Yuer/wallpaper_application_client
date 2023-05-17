import WSkeleton from '@/components/skeleton'
import { navToPictureDetailPage } from '@/hooks/navToPictureDetail'
import { getAlbumDetail, IAlbum } from '@/service/apis/album'
import { formatTime } from '@/utils/format'
import { View, Image, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { memo, useState } from 'react'
import styles from './index.module.scss'

const AlbumDetail = memo(() => {
  const [detail, setDetail] = useState<IAlbum>()
  useLoad((options) => {
    getAlbumDetail(options.id).then((res) => {
      setDetail(res.data)
    })
  })
  return (
    <View>
      {detail ? (
        <View>
          <View className={styles.banner}>
            <Image src={detail.pic} mode='aspectFill'></Image>
            <Text>{detail.title}</Text>
          </View>
          <View className={styles.content}>
            <Text className={styles.description}>{detail.description}</Text>
            <View className={styles.user}>
              <View className='flex align-center'>
                <Image src={detail.user.avatar}></Image>
                <Text>{detail.user.username}</Text>
              </View>
              <View className='text-sm text-gray ml-2'>
                {formatTime(detail.createAt)}
              </View>
            </View>
            <View className={styles.pictures}>
              {detail.pictures.map((_) => (
                <Image
                  src={_.pic}
                  key={_.id}
                  mode='widthFix'
                  onClick={() => navToPictureDetailPage(_.id)}
                ></Image>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View>
          <WSkeleton
            config={{
              width: '100vw',
              height: '300rpx',
              col: 1,
              row: 1,
              gap: 0,
              loading: !detail,
            }}
          />
          <View style={{ marginTop: '20rpx' }}></View>
          <WSkeleton
            config={{
              width: '350rpx',
              height: '500rpx',
              col: 2,
              row: 5,
              gap: 10,
              loading: !detail,
            }}
          />
        </View>
      )}
    </View>
  )
})

export default AlbumDetail
