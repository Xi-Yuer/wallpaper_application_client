import { getPictureDetail, IPictureDetail } from '@/service/apis/picture'
import { Image, View, Text } from '@tarojs/components'
import { ArrowLeft } from '@taroify/icons'
import BackTopBar from '@/components/back-top'
import PictureControlBar from '@/components/picture-control-bar'
import Taro, { useLoad, usePageScroll } from '@tarojs/taro'
import { useSystem } from '@/hooks/useSystem'
import { memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'

const PictureDetail = memo(() => {
  const { menuTop, menuHeight } = useSystem()
  const [id, setId] = useState()
  const [detail, setDetail] = useState<IPictureDetail>()
  const [setBg, setSetBg] = useState(false)

  const [picture, setPictureStyle] = useState<any>({
    mode: 'aspectFill' as any,
  })
  useLoad((options) => {
    setId(options.id)
  })

  const pictureStyle = useMemo(() => {
    if (!picture.detail) return
    const { width, height } = picture.detail
    if (width > 0.9 * height) {
      return {
        mode: 'widthFix' as any,
      }
    }
    return {
      mode: 'aspectFill' as any,
    }
  }, [detail, picture])
  useEffect(() => {
    if (!id) return
    getPictureDetail(id).then((res) => {
      setDetail(res.data)
    })
  }, [id])
  const pictureOnLoad = (e) => {
    setPictureStyle(e)
  }
  const back = () => {
    Taro.navigateBack()
  }

  const recommendsPictureClick = (_) => {
    setId(_)
    Taro.pageScrollTo({
      scrollTop: 0,
    })
  }
  usePageScroll((e) => {
    if (e.scrollTop > 700) {
      setSetBg(true)
    } else {
      setSetBg(false)
    }
  })
  return (
    <View className={styles.wrapper}>
      <View
        className='flex justify-between align-center px-2'
        style={{
          position: 'fixed',
          height: menuHeight,
          top: menuTop,
          left: '0',
          right: '0',
          zIndex: 101,
        }}
      >
        <View className={styles.back_icon}>
          <ArrowLeft size='15' color='white' onClick={back} />
        </View>
        <View></View>
      </View>
      {detail?.id && (
        <View>
          <View className={styles.picture}>
            <Image
              src={detail.pic}
              {...pictureStyle}
              onLoad={pictureOnLoad}
            ></Image>
          </View>
          <PictureControlBar id={detail.id} />
          <View
            className={styles.picture_info}
            style={
              setBg
                ? {
                    height: 2 * menuHeight + menuTop,
                    position: 'sticky',
                    top: '0',
                    paddingTop: menuHeight + menuTop,
                  }
                : {}
            }
          >
            <View className={styles.picture_user_info}>
              <Image src={detail.user.avatar}></Image>
              <Text>{detail.user.username}</Text>
            </View>
            <View>
              <Text className={styles.description}>
                {detail.description !== 'null' ? detail.description : ''}
              </Text>
            </View>
            <View className={styles.tag}>
              {detail.tags.map((_) => (
                <Text key={_.id} className={styles.tag_item}>
                  {_.tagName}
                </Text>
              ))}
            </View>
          </View>
          <View className={styles.recommend_text}>相关推荐</View>
          <View className={styles.more}>
            {detail.recommend?.map((_) => (
              <Image
                src={_.pic}
                key={_.id}
                mode='widthFix'
                onClick={() => recommendsPictureClick(_.id)}
              ></Image>
            ))}
          </View>
        </View>
      )}
      <BackTopBar />
    </View>
  )
})

export default PictureDetail
