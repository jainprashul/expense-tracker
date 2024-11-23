import { configureStore } from '@reduxjs/toolkit'
import expenseSlice from './context/expenseSlice'
import utilitySlice from './context/utilitySlice'
// ...

export const store = configureStore({
  reducer: {
    expense : expenseSlice,
    utility : utilitySlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

