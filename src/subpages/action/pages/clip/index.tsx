import { Button, Canvas, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { memo } from 'react'
import logo from '@/static/images/login.jpg'
const index = memo(() => {
  const draw = () => {
    const canvas = Taro.createCanvasContext('myCanvas')

    Taro.getImageInfo({
      src: logo,
      success: (res) => {
        console.log(res)
        const width = res.width
        const height = res.height

        const squareSize = Math.min(width, height) / 3
        const startX = (width - squareSize) / 2
        const startY = (height - squareSize) / 2

        canvas.clearRect(0, 0, width, height)
        canvas.beginPath()

        canvas.drawImage(
          logo,
          startX,
          startY,
          squareSize,
          squareSize,
          0,
          0,
          100,
          100,
        )

        canvas.draw(false, () => {
          Taro.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: (ret) => {
              Taro.saveImageToPhotosAlbum({
                filePath: ret.tempFilePath,
                success: () => {
                  Taro.showToast({ title: '保存成功', icon: 'success' })
                },
                fail: () => {
                  Taro.showToast({ title: '保存失败', icon: 'none' })
                },
              })
            },
            fail: () => {
              Taro.showToast({ title: '绘制失败', icon: 'none' })
            },
          })
        })
      },
      fail: () => {
        Taro.showToast({ title: '图片加载失败', icon: 'none' })
      },
    })
  }
  return (
    <View>
      <Canvas
        type='2d'
        width='100vw'
        height='600rpx'
        id='myCanvas'
        canvasId='myCanvas'
      ></Canvas>
      <Button onClick={draw}>按钮</Button>
    </View>
  )
})

export default index
