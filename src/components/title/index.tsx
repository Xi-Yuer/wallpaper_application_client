import { Arrow } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC, memo } from 'react'

interface Props {
  title: string
  showMore?: boolean
  morePagePath?: string
}
const Title: FC<Props> = ({ title, showMore = true, morePagePath }) => {
  const navToPage = () => {
    Taro.navigateTo({
      url: morePagePath || '/pages/home/index',
    })
  }
  return (
    <View className='py-2 flex justify-between align-center'>
      <Text className='text-blod'>{title}</Text>
      {showMore && (
        <View className='flex'>
          <Text className='text-gray text-sm' onClick={navToPage}>
            更多
          </Text>
          <Arrow />
        </View>
      )}
    </View>
  )
}

export default memo(Title)
