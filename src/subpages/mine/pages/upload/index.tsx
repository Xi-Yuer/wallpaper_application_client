import Taro from '@tarojs/taro'
import { Image, View, Text } from '@tarojs/components'
import { memo, useEffect, useState } from 'react'
import Theme from '@/components/theme'
import BackTopBar from '@/components/back-top'
import { Plus } from '@taroify/icons'
import { Empty, Tabs } from '@taroify/core'
import { getUserUpload } from '@/service/apis/upload'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

import login from '@/static/images/login.jpg'
import styles from './index.module.scss'

const Index = memo(() => {
  const [list, setList] = useState<any[]>([])
  const [value, setValue] = useState(0)
  const { user } = useSelector<RootState, any>((state) => state.user)
  const navToUploadPage = () => {
    Taro.navigateTo({
      url: '/subpages/mine/pages/user-upload/index',
    })
  }
  useEffect(() => {
    getUserUpload(user.id, value).then((res) => {
      setList(res.data)
    })
  }, [value])
  return (
    <View className={styles.wrapper}>
      <View className={styles.bg}>
        <Image src={login} mode='aspectFill'></Image>
      </View>
      <Tabs onChange={setValue}>
        <Tabs.TabPane title='审核中'></Tabs.TabPane>
        <Tabs.TabPane title='审核通过'></Tabs.TabPane>
      </Tabs>
      <View className={styles.list}>
        {list.length > 0 ? (
          list.map((_: any) => {
            return <Image key={_.id} src={_.pic} mode='widthFix'></Image>
          })
        ) : (
          <View className={styles.center}>
            <Empty className='center'>
              <Empty.Image src='search' />
              <Empty.Description>暂无数据</Empty.Description>
            </Empty>
          </View>
        )}
      </View>
      <View
        onClick={navToUploadPage}
        style={{
          position: 'fixed',
          right: '20rpx',
          bottom: '50rpx',
          width: '120rpx',
          height: '120rpx',
          background: '#00c853',
          borderRadius: '50%',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '25rpx',
          color: 'white',
        }}
      >
        <Plus />
        <Text>上传</Text>
      </View>
      <BackTopBar />
    </View>
  )
})

export default Theme(Index)
