import SearchBar from '@/components/search'
import TagListPicture from '@/components/tag-list-picture'
import Theme from '@/components/theme'
import { useSystem } from '@/hooks/useSystem'
import { getCategoryDetail } from '@/service/apis/category'
import { ITag } from '@/service/apis/home'
import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { memo, useState } from 'react'

const CateGory = memo(() => {
  const [tags, setTags] = useState<ITag[]>([])
  const { customHeight } = useSystem()
  useLoad((options) => {
    getCategoryDetail(options.id).then((res) => {
      setTags(res.data)
    })
  })
  return (
    <View style={{ padding: '0 20rpx' }}>
      <SearchBar isBack />
      <TagListPicture tagList={tags} isSticky stickTop={customHeight} />
    </View>
  )
})

export default Theme(CateGory)
