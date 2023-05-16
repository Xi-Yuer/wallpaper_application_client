import { View, Text, Image, Block } from '@tarojs/components'
import { Swiper, Skeleton } from '@taroify/core'
import Title from '@/components/title/index'
import Theme from '@/components/theme/index'
import TagListPicture from '@/components/tag-list-picture/index'
import SearchBar from '@/components/search/index'

import { useFetch } from './hooks/useFetch'

import styles from './index.module.scss'

const Home = () => {
  const { banner, album, tag } = useFetch()
  return (
    <View className={styles.page_wrapper}>
      <SearchBar />
      {/* 轮播 */}
      <View className={styles.banner}>
        <Swiper autoplay={4000}>
          <Swiper.Indicator />
          {banner &&
            banner.map((_) => (
              <Swiper.Item key={_.id} className={styles.banner_item}>
                <Image
                  src={_.pic}
                  mode='aspectFill'
                  className={styles.banner_images}
                />
              </Swiper.Item>
            ))}
        </Swiper>
        {!banner.length && (
          <Swiper>
            <Swiper.Item className={styles.banner_item}>
              <Skeleton className={styles.banner} animation='wave' />
            </Swiper.Item>
          </Swiper>
        )}
      </View>
      {/* 热门专辑 */}
      <Title title='热门专辑' />
      <View className={styles.album}>
        {album &&
          album.map((_) => (
            <View key={_.id} className={styles.album_images}>
              <Image src={_.pic} mode='aspectFill'></Image>
              <Text className={styles.title}>{_.title}</Text>
            </View>
          ))}
        {!album.length && (
          <Block>
            <Skeleton className={styles.album_images} animation='wave' />
            <Skeleton className={styles.album_images} animation='wave' />
          </Block>
        )}
      </View>
      <Title title='热门标签' />
      <TagListPicture tagList={tag} />
    </View>
  )
}

export default Theme(Home)
