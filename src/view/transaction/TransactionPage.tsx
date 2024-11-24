import Loading from "@/components/shared/Loading"
import MiniTransaction from "@/components/shared/MiniTransaction"
import Page from "@/components/shared/Page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchExpenses } from "@/store/context/expenseSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Transaction from "@/types/Transaction"
import moment from "moment"
import React, { useEffect } from "react"

type Props = {}

const TransactionPage = (_: Props) => {
  const dispatch = useAppDispatch()
  const transactions = useAppSelector((state) => state.expense.data)

  const [loading, setLoading] = React.useState(true)
  const [monthYear, setMonthYear] = React.useState(moment().format('MMM YYYY'))

  useEffect(() => {
    
    dispatch(fetchExpenses()).finally(() => {
      setLoading(false)
    })
  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  const groupedTransactions = groupByDate(transactions)

  return (
    <Page goBack title="Transaction">
        <Select value={monthYear} onValueChange={(e) => setMonthYear(e)} >
          <SelectTrigger className="w-[90%] mt-2 mx-2">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {
              // month with year with the format MMM YYYY with the current month selected by default 
              getMonthYear().map(({month, value}) => (
                <SelectItem key={value} value={month}>
                  {month}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      <div className="flex-grow overflow-y-scroll mt-4 grid grid-cols-1 gap-4  px-4 scrollbar">

        {Object.keys(groupedTransactions).map((date) => (
          <div key={date}>
            <h2 className="text-lg font-semibold pb-1 mb-1 border-b">{date}</h2>
            <div className="space-y-1">
              {groupedTransactions[date].map((transaction) => (
                <MiniTransaction key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        ))}
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