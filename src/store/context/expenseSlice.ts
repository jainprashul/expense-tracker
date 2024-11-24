import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Transaction, { MontlyExpense } from '@/types/Transaction'
import { transactionService } from '@/services/expenseService'


// Define a type for the slice state
interface InitState {
  data : Transaction[]
  loading: boolean
  current: Transaction | null
  monthYear?: string
  monlthyExpenses: MontlyExpense[]
}

// Define the initial state using that type
const initialState: InitState = {
  data: [],
  loading: false,
  current: null,
  monthYear: undefined,
  monlthyExpenses: []

}

export const fetchExpenses = createAsyncThunk( 'expense/fetchExpenses', async () => {
  const response = await transactionService.getTransactions()
  return response
})

export const fetchMonthlyExpenses = createAsyncThunk( 'expense/fetchMonthlyExpenses', async (monthYear?: string) => {
  const response = await transactionService.getMonthlyExpenses(monthYear)
  return response
})

const expenseSlice = createSlice({
  name: 'expense',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(fetchMonthlyExpenses.fulfilled, (state, action) => {
        state.monlthyExpenses = action.payload
      })
  }
})

export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer