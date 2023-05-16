import { Arrow } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import { FC, memo } from 'react'

interface Props {
  title: string
}
const Title: FC<Props> = ({ title }) => {
  return (
    <View className='py-2 flex justify-between align-center'>
      <Text className='text-blod'>{title}</Text>
      <View className='flex'>
        <Text className='text-gray text-sm'>更多</Text>
        <Arrow />
      </View>
    </View>
  )
}

export default memo(Title)
