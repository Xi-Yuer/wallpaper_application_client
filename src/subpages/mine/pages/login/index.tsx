import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { memo, useState } from 'react'
import { BaseEventOrig, FormProps, Image, Text, View } from '@tarojs/components'
import { Button, Cell, Form, Input, Toast } from '@taroify/core'
import { login, register } from '@/service/apis/user'
import { changeUserInfo } from '@/store/user'
import cache from '@/utils/cache'
import Theme from '@/components/theme'
import loginBg from '@/static/images/login.jpg'

import styles from './index.module.scss'
const Index = memo(() => {
  const [isLogin, setIsLogin] = useState(true)
  const dispatch = useDispatch()
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const { username, password } = event.detail.value as any
    const fn = isLogin ? login : register
    fn(username, password).then((res: any) => {
      if (res.statusCode === 200) {
        if (!isLogin) {
          Toast.open('注册成功，立即登录')
          setIsLogin(true)
          return
        }
        cache.set('USER_INFO', res.data)
        cache.set('TOEKN', res.data.token)
        dispatch(changeUserInfo(res.data))
        Toast.open(res.message)
        Taro.navigateBack()
      } else {
        Toast.open(res.message)
      }
    })
  }
  return (
    <View className={styles.wrapper}>
      <View className={styles.bg}>
        <Image src={loginBg} mode='aspectFill'></Image>
      </View>
      <View>
        <Form onSubmit={onSubmit}>
          <Toast id='toast' />
          <Cell.Group inset>
            <Form.Item
              name='username'
              rules={[
                { required: true, message: '用户名3-6位', pattern: /\w{3,6}/ },
              ]}
            >
              <Form.Label>用户名</Form.Label>
              <Form.Control>
                <Input placeholder='用户名' />
              </Form.Control>
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: '密码6-18位', pattern: /\w{6,18}/ },
              ]}
            >
              <Form.Label>密码</Form.Label>
              <Form.Control>
                <Input password placeholder='密码' />
              </Form.Control>
            </Form.Item>
          </Cell.Group>
          <View style={{ margin: '16px' }}>
            <Button shape='round' block color='primary' formType='submit'>
              {isLogin ? '登录' : '注册'}
            </Button>
          </View>
        </Form>
        <Text className={styles.tip} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '还没有账号? 立即注册' : '已有账号? 立即登录'}
        </Text>
      </View>
    </View>
  )
})

export default Theme(Index)
