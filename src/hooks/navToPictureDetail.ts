import Taro from '@tarojs/taro'

export const navToPictureDetailPage = (id: number) => {
  Taro.navigateTo({
    url: `/subpages/picture-detail/index?id=${id}`,
  })
}
