import cache from '@/utils/cache'
import { createSlice } from '@reduxjs/toolkit'

const useUserStore = createSlice({
  name: 'user',
  initialState: {
    user: cache.get('USER_INFO') ? cache.get('USER_INFO') : {},
  },
  reducers: {
    changeUserInfo(state, { payload }) {
      state.user = payload
    },
  },
})
export const { changeUserInfo } = useUserStore.actions
export default useUserStore.reducer
