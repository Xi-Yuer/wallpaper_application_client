import { useReachBottom } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { Search, Empty } from '@taroify/core'
import { DeleteOutlined } from '@taroify/icons'
import { memo, useEffect, useState } from 'react'
import { IPicture, searchApi } from '@/service/apis/picture'
import { getTag, ITag } from '@/service/apis/home'
import cache from '@/utils/cache'
import { navToPictureDetailPage } from '@/hooks/navToPictureDetail'
import styles from './index.module.scss'

const SearchPage = memo(() => {
  const [value, setValue] = useState('')
  const [list, setList] = useState<IPicture[]>([])
  const [hotSearch, setHotSearch] = useState<ITag[]>([])
  const [historySearchKeys, setHistorySearchKeys] = useState<string[]>([])
  const [showList, setShowList] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const onSearch = () => {
    const searchKeys = Array.from(new Set([...historySearchKeys, value]))
    cache.set('search_key', searchKeys)
    setHistorySearchKeys(searchKeys)
    searchApi(value).then((res) => {
      setList(res.data)
    })
    setShowList(true)
  }

  useEffect(() => {
    getTag({
      limit: 10,
      page: 1,
    }).then((res) => {
      setHotSearch(res.data)
    })
    setHistorySearchKeys(
      cache.get('search_key') ? [...cache.get('search_key')] : [],
    )
  }, [])

  const onClear = () => {
    setShowList(false)
    setHasMore(true)
    setPage(1)
  }
  const clearHistorySearch = () => {
    setHistorySearchKeys([])
    cache.remove('search_key')
  }
  const search = (_: string) => {
    setValue(_)
    const searchKeys = Array.from(new Set([...historySearchKeys, _]))
    cache.set('search_key', searchKeys)
    setHistorySearchKeys(searchKeys)
    searchApi(_).then((res) => {
      setList(res.data)
    })
    setShowList(true)
  }
  useReachBottom(() => {
    setPage(page + 1)
    if (!hasMore) return
    searchApi(value, 10, page + 1).then((res) => {
      if (res.data.length) {
        setList([...list, ...res.data])
      } else {
        setHasMore(false)
      }
    })
  })
  return (
    <View className={styles.search_wrapper}>
      <Search
        value={value}
        placeholder='请输入搜索关键词'
        onChange={(e) => setValue(e.detail.value)}
        onSearch={onSearch}
        onClear={onClear}
        clearTrigger='always'
      />
      {historySearchKeys.length > 0 && !showList && (
        <View className={styles.hotsearch} style={{ marginBottom: '40rpx' }}>
          <View className='flex justify-between align-center '>
            <Text className={styles.title}>最近搜索</Text>
            <DeleteOutlined onClick={clearHistorySearch} />
          </View>
          <View className={styles.search_item}>
            {historySearchKeys.map((_) => (
              <View key={_} className={styles.tag} onClick={() => search(_)}>
                {_}
              </View>
            ))}
          </View>
        </View>
      )}
      {!showList && (
        <View className={styles.hotsearch}>
          <Text className={styles.title}>热门标签</Text>
          <View className={styles.search_item}>
            {hotSearch &&
              hotSearch.map((_) => (
                <View
                  key={_.id}
                  className={styles.tag}
                  onClick={() => search(_.tagName)}
                >
                  {_.tagName}
                </View>
              ))}
          </View>
        </View>
      )}
      <View className={styles.list}>
        {list &&
          showList &&
          list.map((_) => (
            <Image
              key={_.id}
              src={_.pic}
              mode='widthFix'
              onClick={() => navToPictureDetailPage(_.id)}
            ></Image>
          ))}
        {list.length === 0 && showList && (
          <View className={styles.center}>
            <Empty>
              <Empty.Image src='search' />
              <Empty.Description>暂无结果</Empty.Description>
            </Empty>
          </View>
        )}
      </View>
    </View>
  )
})

export default SearchPage
