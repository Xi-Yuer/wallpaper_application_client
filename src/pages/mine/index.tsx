import Taro from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useSystem } from '@/hooks/useSystem'
import { Button, Text, View, Image } from '@tarojs/components'
import {
  Edit,
  Arrow,
  StarOutlined,
  Down,
  Upgrade,
  WarningOutlined,
  MoreOutlined,
  Manager,
} from '@taroify/icons'

import styles from './index.module.scss'

const Home = () => {
  const { menuTop, menuHeight } = useSystem()
  const { user } = useSelector<RootState, any>((state) => state.user)
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
      type: 'contact',
    },
    {
      icon: <Edit />,
      name: '建议反馈',
      path: '',
      type: 'feedback',
    },
    {
      icon: <WarningOutlined />,
      name: '关于我们',
      path: '/subpages/mine/pages/about/index',
    },
  ]

  const toLogin = () => {
    Taro.navigateTo({
      url: '/subpages/mine/pages/login/index',
    })
  }
  return (
    <View>
      {/* 背景 */}
      <View
        style={{ height: menuHeight + menuTop + 120 }}
        className={styles.user}
      >
        <View className={styles.avatar_wrapper}>
          <View className={styles.avatar}>
            {user.id ? (
              <Image src={user.avatar} mode='aspectFill'></Image>
            ) : (
              <Manager size='25' color='white' />
            )}
          </View>
          {user.id ? (
            <Text className={styles.text} onClick={toLogin}>
              {user.name || user.username}
            </Text>
          ) : (
            <Text className={styles.text} onClick={toLogin}>
              注册/登录
            </Text>
          )}
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
              className='contents'
              openType={_.type as any}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 -30rpx',
                fontSize: '35rpx',
                boxSizing: 'border-box',
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

export default Home
