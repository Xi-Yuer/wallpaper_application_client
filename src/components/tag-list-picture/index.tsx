import { ITag } from '@/service/apis/home'
import { PullRefresh, Tabs } from '@taroify/core'
import { View, Image, Block } from '@tarojs/components'
import { FC } from 'react'
import WSkeleton from '../skeleton'
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
      <WSkeleton
        config={{
          width: '50rpx',
          height: '10rpx',
          col: 10,
          row: 1,
          gap: 10,
          loading: !!!tagList.length,
        }}
      />
      <PullRefresh loading={loading} onRefresh={onRefresh}>
        <View className={styles.pictures}>
          {pictureList &&
            pictureList.map((_) => (
              <Image src={_.pic} key={_.id} mode='widthFix'></Image>
            ))}
          <WSkeleton
            config={{
              width: '45vw',
              height: '380rpx',
              col: 2,
              row: 10,
              gap: 10,
              loading: !!!pictureList.length,
            }}
          />
        </View>
      </PullRefresh>
    </Block>
  )
}

export default TagListPicture
