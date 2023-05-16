import Taro from '@tarojs/taro'

class Cache {
  set(key: string, value: any) {
    Taro.setStorage({
      key,
      data: JSON.stringify(value),
    })
  }
  get(key: string) {
    const result = Taro.getStorageSync(key)
    if (result) {
      const temResult = JSON.parse(result)
      return temResult
    }
  }

  remove(key: string) {
    return Taro.removeStorage({ key })
  }
  clear() {
    Taro.clearStorage()
  }
}

export default new Cache()
