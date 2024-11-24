export default interface Transaction {
  id?: string
  description?: string
  date: string
  type: string
  paid?: number
  received?: number
  notes?: string
  user_id?: string
}