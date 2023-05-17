import { useSystem } from '@/hooks/useSystem'
import { ShareOutlined, Search, ArrowLeft } from '@taroify/icons'
import { Button, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { CSSProperties, FC, memo, useEffect, useState } from 'react'
import styles from './index.module.scss'

interface IProps {
  isBack?: boolean
}
const SearchBar: FC<IProps> = memo(({ isBack = false }) => {
  const { menuTop, menuHeight } = useSystem()
  const [searchStyle, setSearchStyle] = useState<CSSProperties>()
  // 初始化搜索状态栏
  useEffect(() => {
    setSearchStyle({
      height: menuHeight + menuTop + menuHeight / 2,
      margin: '0 -20rpx',
      paddingTop: menuTop,
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(45deg, #fcd387, pink)',
      boxSizing: 'border-box',
      zIndex: 100,
    })
  }, [menuTop, menuHeight])

  const back = () => {
    Taro.navigateBack()
  }
  const navToSearchPage = () => {
    Taro.navigateTo({
      url: '/subpages/search/index',
    })
  }
  return (
    <View style={searchStyle}>
      <View className={styles.search_wrapper}>
        {isBack ? (
          <Button onClick={back}>
            <ArrowLeft size='20' className={styles.share_icon} />
          </Button>
        ) : (
          <Button openType='share'>
            <ShareOutlined size='20' className={styles.share_icon} />
          </Button>
        )}

        <View
          className={styles.search}
          style={{ height: menuHeight }}
          onClick={navToSearchPage}
        >
          <Search className={styles.search_icon} />
          <Text>搜索头像</Text>
        </View>
        <View style={{ flex: 2 }}></View>
      </View>
    </View>
  )
})

export default SearchBar
