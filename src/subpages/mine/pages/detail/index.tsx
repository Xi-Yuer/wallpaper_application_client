import { BaseEventOrig, FormProps, Image, View } from '@tarojs/components'
import { Button, Cell, Form, Input, Toast } from '@taroify/core'
import { memo } from 'react'
import Theme from '@/components/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { updataUser, updateUserAvatar } from '@/service/apis/user'
import { changeUserInfo } from '@/store/user'
import cache from '@/utils/cache'
import Taro from '@tarojs/taro'

const Index = memo(() => {
  const { user } = useSelector<RootState, any>((state) => state.user)
  const dispatch = useDispatch()
  const changeUser = (res) => {
    console.log(res.data)
    dispatch(changeUserInfo(res.data))
  }
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Taro.showLoading()
    if (event.detail.value) {
      updataUser(user.id, {
        username: event.detail.value.username,
        password: event.detail.value.password,
      }).then((res) => {
        changeUser(res)
        cache.set('USER_INFO', res.data)
        Taro.hideLoading()
        Taro.navigateBack()
      })
    }
  }

  const onChooseAvatar = (e) => {
    updateUserAvatar(user.id, e.detail.avatarUrl).then((res: any) => {
      cache.set('USER_INFO', JSON.parse(res.data).data)
      dispatch(changeUserInfo(JSON.parse(res.data).data))
    })
  }
  return (
    <View>
      <View
        className='flex justify-between align-center'
        style={{
          padding: '0 65rpx',
          color: '#646566',
          fontSize: '30rpx',
          height: '100rpx',
          overflow: 'hidden',
        }}
      >
        <View>头像</View>
        <Button
          openType='chooseAvatar'
          style={{
            height: '100rpx !important',
            overflow: 'hidden',
          }}
          onChooseAvatar={onChooseAvatar}
        >
          <Image
            src={user.avatar}
            style={{ width: '100rpx', height: '100rpx', borderRadius: '50%' }}
            mode='scaleToFill'
          ></Image>
        </Button>
      </View>
      <View>
        <Form onSubmit={onSubmit}>
          <Toast id='toast' />
          <Cell.Group inset>
            <Form.Item name='username'>
              <Form.Label>用户名</Form.Label>
              <Form.Control>
                <Input placeholder='用户名' type='nickname'></Input>
              </Form.Control>
            </Form.Item>
            <Form.Item name='password'>
              <Form.Label>密码</Form.Label>
              <Form.Control>
                <Input password placeholder='密码' />
              </Form.Control>
            </Form.Item>
          </Cell.Group>
          <View style={{ margin: '16px' }}>
            <Button shape='round' block color='primary' formType='submit'>
              提交
            </Button>
          </View>
        </Form>
      </View>
    </View>
  )
})

export default Theme(Index)
