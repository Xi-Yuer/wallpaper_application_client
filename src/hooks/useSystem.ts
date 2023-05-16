import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

export function useSystem() {
  const [navBarHeight, setNavBarHeight] = useState(0)
  const [menuRight, setMenuRight] = useState(0)
  const [menuTop, setMenuTop] = useState(0)
  const [menuHeight, setMenuHeight] = useState(0)
  const systemInfo = Taro.getSystemInfoSync()

  useEffect(() => {
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()
    // 导航栏高度 = 状态栏高度 + 44
    setNavBarHeight((systemInfo.statusBarHeight || 0) + 44)
    setMenuRight(systemInfo.screenWidth - menuButtonInfo.right)
    setMenuTop(menuButtonInfo.top)
    setMenuHeight(menuButtonInfo.height)
  }, [systemInfo.screenWidth, systemInfo.statusBarHeight])
  // 胶囊按钮位置信息

  return {
    navBarHeight,
    menuRight,
    menuTop,
    menuHeight,
  }
}
