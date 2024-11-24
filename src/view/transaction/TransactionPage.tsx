import Loading from "@/components/shared/Loading"
import MiniTransaction from "@/components/shared/MiniTransaction"
import Page from "@/components/shared/Page"
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

  useEffect(() => {
    dispatch(fetchExpenses()).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  const groupedTransactions = groupByDate(transactions)

  return (
    <Page goBack title="Transaction">
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

function groupByDate(transactions : Transaction[]){
  return transactions.reduce((acc, transaction) => {
    const date = moment(transaction.date).format('DD MMM YYYY')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)
}