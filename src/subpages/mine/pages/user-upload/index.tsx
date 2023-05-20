import Taro from '@tarojs/taro'
import { Plus, WarningOutlined } from '@taroify/icons'
import { Image, Text, View } from '@tarojs/components'
import { Button, TreeSelect } from '@taroify/core'
import Theme from '@/components/theme'
import { memo, useEffect, useState } from 'react'
import { uploadPicture } from '@/service/apis/upload'
import { getAllCategory, Tag } from '@/service/apis/category'
import { ICategory } from '@/service/apis/home'
import styles from './index.module.scss'
const Index = memo(() => {
  // 分类 id
  const [tabValue, setTabValue] = useState(0)
  // 标签 id
  const [value, setValue] = useState(0)
  const [imagePath, setImagePath] = useState('')
  const [category, setCategory] = useState<(ICategory & Tag)[]>([])

  console.log(tabValue)
  console.log(value)
  const pickImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        console.log(res)
        setImagePath(res.tempFilePaths[0])
      },
    })
  }

  const upload = () => {
    if (!tabValue || !value || !imagePath) {
      Taro.showToast({
        title: '不满足上传格式要求',
        icon: 'error',
      })
      return
    }
    Taro.showLoading()
    uploadPicture(imagePath, tabValue, value)
      .then(() => {
        Taro.showToast({
          title: '上传成功',
          icon: 'success',
        })
      })
      .finally(() => {
        Taro.hideLoading()
        setImagePath('')
      })
  }
  useEffect(() => {
    getAllCategory().then((res) => {
      setCategory(res.data)
      setTabValue(res.data[0].id)
    })
  }, [])

  const navToCopyRight = () => {
    Taro.navigateTo({
      url: '/subpages/mine/pages/copyright/index',
    })
  }
  return (
    <View className={styles.wrapper}>
      <View className={styles.top}>
        <View className={styles.right}>
          <Text className='text-sm text-gray'>选择分类和标签</Text>
          <TreeSelect
            tabValue={tabValue}
            value={value}
            onTabChange={(e) => {
              setTabValue(e)
              setValue(0)
            }}
            onChange={setValue}
          >
            {category &&
              category.map((_) => {
                return (
                  <TreeSelect.Tab title={_.name} key={_.id} value={_.id}>
                    {_.tags &&
                      _.tags.map((tag) => (
                        <TreeSelect.Option value={tag.id} key={tag.id}>
                          {tag.tagName}
                        </TreeSelect.Option>
                      ))}
                  </TreeSelect.Tab>
                )
              })}
          </TreeSelect>
        </View>
        <View className={styles.left}>
          {imagePath ? (
            <View className={styles.bg}>
              <Image src={imagePath} mode='aspectFill'></Image>
            </View>
          ) : (
            <View className={styles.bg} onClick={pickImage}>
              <Plus />
            </View>
          )}
        </View>
      </View>
      <View onClick={navToCopyRight}>
        <Text className='text-sm text-gray'>版权说明</Text>
        <WarningOutlined />
      </View>
      <View
        style={{
          position: 'fixed',
          bottom: '60rpx',
          left: '20rpx',
          right: '20rpx',
        }}
      >
        <Button shape='round' block color='primary' onClick={upload}>
          提交
        </Button>
      </View>
    </View>
  )
})

export default Theme(Index)
