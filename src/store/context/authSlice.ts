import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Session, User } from "@supabase/supabase-js"

interface InitState {
  user: User | null
  loading: boolean
  session: Session | null
}

const initialState: InitState = {
  user: null,
  loading: false,
  session: null,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload
    },
  },
}) 

export const authActions = authSlice.actions

export default authSlice.reducer