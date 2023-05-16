import { CSSProperties, useEffect, useState } from 'react'

import { View, Text, Image, Block, Button } from '@tarojs/components'
import { Swiper, Skeleton } from '@taroify/core'
import { ShareOutlined, Search } from '@taroify/icons'
import Title from '@/components/title/index'
import Theme from '@/components/theme/index'
import TagListPicture from '@/components/tag-list-picture/index'

import { useSystem } from '../../hooks/useSystem'
import { useFetch } from './hooks/useFetch'

import styles from './index.module.scss'

const Home = () => {
  const { menuTop, menuHeight } = useSystem()
  const { banner, album } = useFetch()
  const [searchStyle, setSearchStyle] = useState<CSSProperties>()
  // 初始化搜索状态栏
  useEffect(() => {
    setSearchStyle({
      height: menuHeight + menuTop + menuHeight / 2,
      margin: '0 -2rpx',
      paddingTop: menuTop,
      position: 'sticky',
      top: 0,
      background: 'white',
      boxSizing: 'border-box',
      zIndex: 100,
    })
  }, [menuTop, menuHeight])
  return (
    <View className={styles.page_wrapper}>
      {/* 搜索 */}
      <View style={searchStyle}>
        <View className={styles.search_wrapper}>
          <Button openType='share'>
            <ShareOutlined size='20' className={styles.share_icon} />
          </Button>
          <View className={styles.search} style={{ height: menuHeight }}>
            <Search className={styles.search_icon} />
            <Text>搜索头像</Text>
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
      </View>
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
            <Image
              src={_.pic}
              key={_.id}
              className={styles.album_images}
              mode='aspectFill'
            ></Image>
          ))}
        {!album.length && (
          <Block>
            <Skeleton className={styles.album_images} animation='wave' />
            <Skeleton className={styles.album_images} animation='wave' />
          </Block>
        )}
      </View>
      <Title title='热门标签' />
      <TagListPicture />
    </View>
  )
}

export default Theme(Home)
