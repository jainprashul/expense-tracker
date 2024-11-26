import Loading from "@/components/shared/Loading"
import MiniTransaction from "@/components/shared/MiniTransaction"
import Page from "@/components/shared/Page"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TRANSACTION_ADD } from "@/navigation/route"
import { expenseActions, fetchExpenses } from "@/store/context/expenseSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Transaction from "@/types/Transaction"
import { PlusIcon } from "lucide-react"
import moment from "moment"
import React, { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const TransactionPage = (_: Props) => {
  const dispatch = useAppDispatch()
  const transactions = useAppSelector((state) => state.expense.data)
  const navigate = useNavigate()

  const [loading, setLoading] = React.useState(true)
  const [monthYear, setMonthYear] = React.useState(moment().format('YYYY-MM'))

  useEffect(() => {

    // Get Start and End of the month 
    const from = moment(monthYear).startOf('month').format('YYYY-MM-DD')
    const to = moment(monthYear).endOf('month').format('YYYY-MM-DD')
    setLoading(true)
    dispatch(fetchExpenses({
      from, to
    })).finally(() => {
      setLoading(false)
    })
  }, [dispatch, monthYear])
  const groupedTransactions = useMemo(() => groupByDate(transactions), [transactions])

  
  
  return (
    <Page goBack title="Transaction">
      {loading && <Loading overlay/>}
      <div className="flex items-center m-3 gap-2">
      <Select value={monthYear} onValueChange={(e) => setMonthYear(e)} >
        <SelectTrigger >
          <SelectValue placeholder="Month Year" />
        </SelectTrigger>
        <SelectContent>
          {
            // month with year with the format MMM YYYY with the current month selected by default 
            getMonthYear().map(({ month, value }) => (
              <SelectItem key={value} value={value}>
                {month}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

        <Button variant={'outline'} className="bg-zinc-800" onClick={() => navigate(TRANSACTION_ADD)}><PlusIcon size={24} /></Button>
      </div>
      <div className="flex-grow overflow-y-scroll mt-4 mb-8 grid grid-cols-1 gap-4 px-4 scrollbar">

        {Object.keys(groupedTransactions).map((date) => {
          const total = groupedTransactions[date].reduce((acc, transaction) => {
            return acc - (transaction.paid || 0) + (transaction.received || 0)
          }, 0)
          return (
            <div key={date}>
              <h2 className="text-lg font-semibold pb-1 mb-1 border-b flex justify-between items-center">{date} <span className="text-sm font-normal text-gray-500">
                {Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                }).format(total)}
              </span></h2>
              <div className="space-y-1">
                {groupedTransactions[date].map((transaction) => (
                  <MiniTransaction key={transaction.id} transaction={transaction} onClick={() => {
                    console.log(transaction)
                    dispatch(expenseActions.setCurrent(transaction))
                    navigate(`/transaction/${transaction.id}`)
                  }} />
                ))}
              </div>
            </div>
          )
        }
        )}
      </div>

    </Page>
  )
}

export default TransactionPage

function groupByDate(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    const date = moment(transaction.date).format('DD MMM YYYY')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)

}

function getMonthYear() {
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = moment().subtract(i, 'months').format('MMM YYYY')
    const value = moment().subtract(i, 'months').format('YYYY-MM')
    return { month, value }
  })
  return months
}