import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { Swiper } from '@taroify/core'
import { useSystem } from '@/hooks/useSystem'
import Title from '@/components/title/index'
import Theme from '@/components/theme/index'
import TagListPicture from '@/components/tag-list-picture/index'
import SearchBar from '@/components/search/index'
import WSkeleton from '@/components/skeleton'
import BackTopBar from '@/components/back-top'

import { useFetch } from './hooks/useFetch'

import styles from './index.module.scss'

const HomePage = () => {
  const { banner, album, tag } = useFetch()
  const { customHeight } = useSystem()
  const navToAlbumDetailPage = (id) => {
    Taro.navigateTo({
      url: `/subpages/album-detail/index?id=${id}`,
    })
  }

  const navToDetailPage = (_) => {
    if (_.type === 'album') {
      Taro.navigateTo({
        url: `/subpages/album-detail/index?id=${_.albumId}`,
      })
    }
  }
  return (
    <View className={styles.page_wrapper}>
      <SearchBar />
      {/* 轮播 */}
      <View className={styles.banner}>
        <Swiper autoplay={4000}>
          <Swiper.Indicator />
          {banner &&
            banner.map((_) => (
              <Swiper.Item
                key={_.id}
                className={styles.banner_item}
                onClick={() => navToDetailPage(_)}
              >
                <Image
                  src={_.pic}
                  mode='aspectFill'
                  className={styles.banner_images}
                />
              </Swiper.Item>
            ))}
        </Swiper>
        <WSkeleton
          config={{
            width: '100vw',
            height: '300rpx',
            col: 1,
            row: 1,
            gap: 0,
            loading: !!!banner.length,
          }}
        />
      </View>
      {/* 热门专辑 */}
      <Title title='热门专辑' morePagePath='/subpages/album/index' />
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
            row: 1,
            gap: 10,
            loading: !!!album.length,
          }}
        />
      </View>
      <Title title='热门推荐' morePagePath='/subpages/hot-recommends/index' />
      <TagListPicture tagList={tag} isSticky stickTop={customHeight} />
      <BackTopBar />
    </View>
  )
}

export default Theme(HomePage)
