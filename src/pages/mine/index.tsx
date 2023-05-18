import Taro from '@tarojs/taro'
import { useSystem } from '@/hooks/useSystem'
import { Button, Image, Text, View } from '@tarojs/components'
import { memo } from 'react'
import {
  Edit,
  Arrow,
  StarOutlined,
  Down,
  Upgrade,
  WarningOutlined,
  MoreOutlined,
} from '@taroify/icons'

import styles from './index.module.scss'

const Home = () => {
  const { menuTop, menuHeight } = useSystem()

  const navToPage = (path: string) => {
    Taro.navigateTo({
      url: path,
    })
  }
  const list = [
    {
      icon: <Edit />,
      name: '完善资料',
      path: '/subpages/mine/pages/detail/index',
    },
    {
      icon: <StarOutlined />,
      name: '我的收藏',
      path: '/subpages/mine/pages/favor/index',
    },
    {
      icon: <Down />,
      name: '我的下载',
      path: '/subpages/mine/pages/download/index',
    },
    {
      icon: <Upgrade />,
      name: '上传壁纸',
      path: '/subpages/mine/pages/upload/index',
    },
  ]
  const moreList = [
    {
      icon: <MoreOutlined />,
      name: '联系我们',
      path: '',
      type: 'custom',
    },
    {
      icon: <WarningOutlined />,
      name: '关于我们',
      path: '/subpages/mine/pages/about/index',
    },
  ]
  return (
    <View>
      {/* 背景 */}
      <View
        style={{ height: menuHeight + menuTop + 120 }}
        className={styles.user}
      >
        <View className={styles.avatar_wrapper}>
          <View className={styles.avatar}>
            <Image
              src='https://p.qqan.com/up/2018-4/2018041711105148417.jpg'
              mode='aspectFill'
            ></Image>
          </View>
          <Text className={styles.text}>注册/登录</Text>
        </View>
      </View>
      <View className={styles.fnlist}>
        {list.map((_) => (
          <View
            className={styles.fnlist_item}
            key={_.name}
            onClick={() => navToPage(_.path)}
          >
            <View className={styles.left}>
              {_.icon}
              <Text>{_.name}</Text>
            </View>
            <View>
              <Arrow />
            </View>
          </View>
        ))}
      </View>
      <View className={styles.line}></View>
      <View className={styles.fnlist}>
        {moreList.map((_) =>
          _.type ? (
            <Button
              key={_.path}
              openType='contact'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 -28rpx',
                lineHeight: '100rpx',
              }}
            >
              <View className={styles.left}>
                {_.icon}
                <Text
                  style={{
                    marginLeft: '20rpx',
                    color: '#535252',
                    fontSize: '30rpx',
                  }}
                >
                  {_.name}
                </Text>
              </View>
              <View>
                <Arrow />
              </View>
            </Button>
          ) : (
            <View
              className={styles.fnlist_item}
              key={_.name}
              onClick={() => navToPage(_.path)}
            >
              <View className={styles.left}>
                {_.icon}
                <Text>{_.name}</Text>
              </View>
              <View>
                <Arrow />
              </View>
            </View>
          ),
        )}
      </View>
    </View>
  )
}

export default memo(Home)
