import { View } from '@tarojs/components'
import { Skeleton } from '@taroify/core'
import { FC, memo } from 'react'

// TODO: 宽、高、几行、几列
interface IProps {
  config: {
    width: string
    height: string
    col: number
    row: number
    gap: number
    loading: boolean
  }
}
const WSkeleton: FC<IProps> = memo(({ config }) => {
  const { width, height, col, row, gap, loading } = config
  return loading ? (
    <View
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: gap,
      }}
    >
      {new Array(col * row).fill(Math.floor(Math.random())).map((_) => {
        return (
          <Skeleton
            key={_}
            style={{
              width,
              height,
            }}
          ></Skeleton>
        )
      })}
    </View>
  ) : null
})

export default WSkeleton
