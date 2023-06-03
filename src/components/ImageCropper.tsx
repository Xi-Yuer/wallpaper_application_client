import Taro from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'

function ImageCropper(props) {
  const { src, width, height, cellSize } = props

  const handleCrop = () => {
    const cellCountX = Math.ceil(width / cellSize)
    const cellCountY = Math.ceil(height / cellSize)

    const canvasWidth = width * cellCountX
    const canvasHeight = height * cellCountY

    const ctx = Taro.createCanvasContext('cropper', this)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.drawImage(src, 0, 0, width, height, 0, 0, canvasWidth, canvasHeight)
    ctx.draw(false, () => {
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
        canvasId: 'cropper',
        success: (res) => {
          console.log('Cropped image:', res.tempFilePath)
        },
        fail: (err) => {
          console.error('Failed to crop image:', err)
        },
      })
    })
  }

  return (
    <View>
      <Canvas
        type='2d'
        id='cropper'
        canvasId='cropper'
        style={{ display: 'block' }}
        disableScroll
        onClick={handleCrop}
        onTouchStart={handleCrop}
        onTouchMove={handleCrop}
        onTouchEnd={handleCrop}
      />
    </View>
  )
}

export default ImageCropper
