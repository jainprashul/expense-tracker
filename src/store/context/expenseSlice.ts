import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Transaction, { Category, CategoryWiseExpense, MonthlyTransaction } from '@/types/Transaction'
import { transactionService } from '@/services/expenseService'


// Define a type for the slice state
interface InitState {
  data : Transaction[]
  loading: boolean
  current: Transaction | null
  monthlyExpenses: MonthlyTransaction[]
  categories : Category[]
  categoryWise : CategoryWiseExpense[]
}

// Define the initial state using that type
const initialState: InitState = {
  data: [],
  loading: false,
  current: null,
  monthlyExpenses: [],
  categories : [],
  categoryWise: []

}

export const fetchExpenses = createAsyncThunk( 'expense/fetchExpenses', async ({ from, to } : {
  to ?: string , from ?: string
}) => {
  const response = await transactionService.getTransactions(from, to)
  return response
})

export const fetchMonthlyExpenses = createAsyncThunk( 'expense/fetchMonthlyExpenses', async (monthYear?: string) => {
  const response = await transactionService.getMonthlyExpenses(monthYear)
  return response
})

export const fetchCategories = createAsyncThunk( 'expense/fetchCategories', async () => {
  const response = await transactionService.getCategories()
  return response
})

export const fetchCategoryWiseExpenses = createAsyncThunk( 'expense/fetchCategoryWiseExpenses', async (monthYear?: string) => {
  const response = await transactionService.getCategoryExpenses(monthYear)
  return response
});

const expenseSlice = createSlice({
  name: 'expense',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrent: (state, action : PayloadAction<Transaction | null>) => {
      state.current = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(fetchMonthlyExpenses.fulfilled, (state, action) => {
        state.monthlyExpenses = action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchCategoryWiseExpenses.fulfilled, (state, action) => {
        state.categoryWise = action.payload
      })
  }
})

export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer