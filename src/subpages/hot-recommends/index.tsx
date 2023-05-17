import TagListPicture from '@/components/tag-list-picture'
import { getTag, ITag } from '@/service/apis/home'
import { View } from '@tarojs/components'
import { memo, useEffect, useState } from 'react'

const HotRecommends = memo(() => {
  const [data, setData] = useState<ITag[]>([])
  useEffect(() => {
    getTag({
      limit: 10,
      page: 2,
    }).then((res) => {
      setData(res.data)
    })
  }, [])
  return (
    <View>
      <TagListPicture tagList={data} isSticky stickTop={0} />
    </View>
  )
})

export default HotRecommends
