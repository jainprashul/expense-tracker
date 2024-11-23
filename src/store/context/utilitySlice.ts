import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitState {
  header: {
    title: string
    goBack?: boolean
  },
}

const initialState: InitState = {
  header: {
    title: 'Expense Tracker',
    goBack: false,
  },
}

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<InitState['header']>) => {
      state.header = action.payload
    },
  },
})

export const utilityActions = utilitySlice.actions

export default utilitySlice.reducer