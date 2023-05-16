import { ITag } from '@/service/apis/home'
import { PullRefresh, Skeleton, Tabs } from '@taroify/core'
import { View, Image, Block } from '@tarojs/components'
import { FC } from 'react'
import { useFetch } from './hooks/useFetch'
import styles from './index.module.scss'

interface IProps {
  tagList: ITag[]
}
const TagListPicture: FC<IProps> = ({ tagList = [] }) => {
  const { tabChange, currentTag, loading, pictureList, onRefresh } =
    useFetch(tagList)
  return (
    <Block>
      <Tabs animated swipeable onChange={tabChange} value={currentTag}>
        {tagList &&
          tagList.map((_) => (
            <Tabs.TabPane
              title={_.tagName}
              key={_.id}
              value={_.id}
            ></Tabs.TabPane>
          ))}
      </Tabs>
      {!tagList.length && (
        <View className='flex justify-between'>
          {new Array(10).fill(Math.floor(Math.random())).map((_) => (
            <Skeleton
              key={_}
              style={{
                width: '45rpx',
                height: '15rpx',
              }}
              animation='wave'
            />
          ))}
        </View>
      )}
      <PullRefresh loading={loading} onRefresh={onRefresh}>
        <View className={styles.pictures}>
          {pictureList &&
            pictureList.map((_) => (
              <Image src={_.pic} key={_.id} mode='widthFix'></Image>
            ))}
        </View>
      </PullRefresh>
    </Block>
  )
}

export default TagListPicture
