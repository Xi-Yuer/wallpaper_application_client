import { View } from '@tarojs/components'
import { BackTop } from '@taroify/icons'
import { memo, useState } from 'react'
import Taro, { usePageScroll } from '@tarojs/taro'

const BackTopBar = memo(() => {
  const [show, setShow] = useState(false)
  usePageScroll((e) => {
    if (e.scrollTop > 1000) {
      setShow(true)
    } else {
      setShow(false)
    }
  })

  const backTop = () => {
    Taro.pageScrollTo({
      scrollTop: 0,
    })
  }
  return show ? (
    <View
      onClick={backTop}
      style={{
        position: 'fixed',
        right: '20rpx',
        bottom: '30rpx',
        width: '80rpx',
        height: '80rpx',
        borderRadius: '50%',
        background: '#00000047',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '35rpx',
      }}
    >
      <BackTop />
    </View>
  ) : null
})

export default BackTopBar
