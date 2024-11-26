import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import moment from "moment"

interface InitState {
  header: {
    title: string
    goBack?: boolean
  },
  filter: {
    monthYear: string
  },
}

const initialState: InitState = {
  header: {
    title: 'Expense Tracker',
    goBack: false,    
  },
  filter: {
    monthYear: moment().format('YYYY-MM'),
  },
}

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<InitState['header']>) => {
      state.header = action.payload
    },
    setFilter: (state, action: PayloadAction<InitState['filter']>) => {
      state.filter = action.payload
    },
    setMonthYearFilter: (state, action: PayloadAction<string>) => {
      state.filter.monthYear = action.payload
    },
  },
})

export const utilityActions = utilitySlice.actions

export default utilitySlice.reducer