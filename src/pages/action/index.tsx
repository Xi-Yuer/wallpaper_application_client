import { PhotoOutlined } from '@taroify/icons'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { memo } from 'react'
import styles from './index.module.scss'

const navTol1 = () => {
  Taro.navigateTo({
    url: '/subpages/action/pages/clip/index',
  })
}
const Home = () => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.l1} onClick={navTol1}>
        <PhotoOutlined size='35' />
        <Text>图片裁剪</Text>
      </View>
    </View>
  )
}

export default memo(Home)
