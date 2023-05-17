import { useEffect, useState } from 'react'
import { Image, View, Text } from '@tarojs/components'
import Theme from '@/components/theme'
import SearchBar from '@/components/search'
import Taro from '@tarojs/taro'
import Title from '@/components/title'
import WSkeleton from '@/components/skeleton'
import { getHotCateGory, getHotTag } from '@/service/apis/search'
import { ITag } from '@/service/apis/home'
import { Category } from '@/service/apis/picture'

import styles from './index.module.scss'

const SearchPage = () => {
  const [hotTag, setHotTag] = useState<ITag[]>([])
  const [hotCateGory, setHotCateGory] = useState<Category[]>([])
  useEffect(() => {
    getHotTag().then((res) => {
      setHotTag(res.data)
    })
    getHotCateGory().then((res) => {
      setHotCateGory(res.data)
    })
  }, [])

  const navToCategoryPage = (id: number) => {
    Taro.navigateTo({
      url: `/subpages/category/index?id=${id}`,
    })
  }
  const navToTagPicturePage = (id: number, title: string) => {
    Taro.navigateTo({
      url: `/subpages/tag-picture/index?id=${id}&title=${title}`,
    })
  }
  return (
    <View className={styles.search_Wrapper}>
      <SearchBar />
      <Title title='热门标签' showMore={false} />
      <View className={styles.scroll}>
        {hotTag &&
          hotTag.map((_) => {
            return (
              <View
                key={_.id}
                className={styles.scroll_item}
                onClick={() => navToTagPicturePage(_.id, _.tagName)}
              >
                <Image src={_.pic} mode='aspectFill'></Image>
                <Text className={styles.tag_text}>{_.tagName}</Text>
              </View>
            )
          })}
        <WSkeleton
          config={{
            width: '280rpx',
            height: '150rpx',
            col: 6,
            row: 1,
            gap: 10,
            loading: !!!hotTag.length,
          }}
        />
      </View>
      <Title title='热门分类' showMore={false} />
      <View className={styles.hot_category}>
        {hotCateGory &&
          hotCateGory.map((_) => {
            return (
              <View
                key={_.id}
                className={styles.category_item}
                onClick={() => navToCategoryPage(_.id)}
              >
                <Image src={_.pic} mode='aspectFill'></Image>
                <Text className={styles.category_text}>{_.name}</Text>
              </View>
            )
          })}
        <WSkeleton
          config={{
            width: '45vw',
            height: '150rpx',
            col: 2,
            row: 10,
            gap: 15,
            loading: !!!hotCateGory.length,
          }}
        />
      </View>
    </View>
  )
}

export default Theme(SearchPage)
