import { Image, View, Text } from '@tarojs/components'
import { memo } from 'react'
import logo from '@/static/images/logo.jpg'
import styles from './index.module.scss'
const Index = memo(() => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.center}>
        <View>
          <Image src={logo} className={styles.logo}></Image>
        </View>
        <Text className='text-sm text-gray'>Xi-Yuer</Text>
        <Text className='text-sm text-gray'>
          赋予了我好看的皮囊以及有趣的灵魂
        </Text>
      </View>
      <View className={styles.bottom}>
        免责声明：部分内容来自互联网，如果涉及版权问题，请随时告知我们
      </View>
    </View>
  )
})

export default Index
