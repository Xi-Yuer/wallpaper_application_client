import { useSystem } from '@/hooks/useSystem'
import { ShareOutlined, Search } from '@taroify/icons'
import { Button, View, Text } from '@tarojs/components'
import { CSSProperties, memo, useEffect, useState } from 'react'
import styles from './index.module.scss'
const SearchBar = memo(() => {
  const { menuTop, menuHeight } = useSystem()
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
  )
})

export default SearchBar
