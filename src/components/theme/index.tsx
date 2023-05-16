import { ComponentType, FC } from 'react'
import { ConfigProvider } from '@taroify/core'

const Theme = <P extends object>(Component: ComponentType<P>) => {
  const ThemeComponent: FC<P> = (props) => {
    return (
      <ConfigProvider
        theme={{
          rateIconFullColor: '#07c160',
          sliderTrackHeight: '4px',
          sliderButtonWidth: '20px',
          sliderButtonHeight: '20px',
          sliderActiveBackgroundColor: '#07c160',
          buttonPrimaryBorderColor: '#07c160',
          buttonPrimaryBackgroundColor: '#07c160',
          tabsLineBackgroundColor: '#ffe048',
          tabActiveColor: '#ffe048',
          swiperIndicatorActiveBackgroundColor: '#ffe048',
        }}
      >
        <Component {...props} />
      </ConfigProvider>
    )
  }
  return ThemeComponent
}

export default Theme
