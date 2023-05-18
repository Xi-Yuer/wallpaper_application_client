import { View, Text } from '@tarojs/components'
import Taro, { usePageScroll } from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { LabelOutlined, Down, ArrowDown } from '@taroify/icons'
import styles from './index.module.scss'

interface IProps {
  id: number
}
const PictureControlBar: FC<IProps> = memo(() => {
  const [showControlBar, setShowControlBar] = useState(true)
  const [opacity, setOpacity] = useState(100)
  usePageScroll((e) => {
    setOpacity(1 - e.scrollTop / 100)
    if (e.scrollTop > 100) {
      setShowControlBar(false)
    } else {
      setShowControlBar(true)
    }
  })

  const more = () => {
    Taro.pageScrollTo({
      scrollTop: 600,
    })
  }
  return (
    <View>
      <View
        className={styles.control}
        style={{ opacity: opacity, display: showControlBar ? 'block' : 'none' }}
      >
        <View className={styles.control_content}>
          <View className={styles.control_content_item}>
            <LabelOutlined />
            <Text>收藏</Text>
          </View>
          <View className={styles.control_content_item}>
            <Down />
            <Text>下载</Text>
          </View>
          <View className={styles.control_content_item} onClick={more}>
            <ArrowDown />
            <Text>更多</Text>
          </View>
        </View>
      </View>
    </View>
  )
})

export default PictureControlBar
