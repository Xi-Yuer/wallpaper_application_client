export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/action/index',
    'pages/search/index',
    'pages/mine/index',
  ],
  subPackages: [
    {
      root: 'subpages',
      pages: ['album/index'],
    },
  ],
  tabBar: {
    selectedColor: '#ffe048',
    color: '#cdcdcd',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: './static/images/home-gray.png',
        selectedIconPath: './static/images/home.png',
        text: '首页',
      },
      {
        pagePath: 'pages/search/index',
        iconPath: './static/images/search-gray.png',
        selectedIconPath: './static/images/search.png',
        text: '搜索',
      },
      {
        pagePath: 'pages/action/index',
        iconPath: './static/images/action-gray.png',
        selectedIconPath: './static/images/action.png',
        text: '发现',
      },
      {
        pagePath: 'pages/mine/index',
        iconPath: './static/images/mine-gray.png',
        selectedIconPath: './static/images/mine.png',
        text: '我的',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },

  lazyCodeLoading: 'requiredComponents',
})
