export default interface Transaction {
  id?: string
  description?: string
  date: string
  type: string
  paid?: number
  received?: number
  notes?: string
  user_id?: string
  category?: number
}


export interface MontlyExpense {
  date: string
  total_paid: number | null
  total_received: number | null
}

export interface Category {
  readonly id?: string
  description?: string
  name : string
}