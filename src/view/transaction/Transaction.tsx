import Loading from "@/components/shared/Loading"
import MiniTransaction from "@/components/shared/MiniTransaction"
import { fetchExpenses } from "@/store/context/expenseSlice"
import { utilityActions } from "@/store/context/utilitySlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Expense from "@/types/Expense"
import moment from "moment"
import React, { useEffect } from "react"

type Props = {}

const Transaction = (_: Props) => {
  const dispatch = useAppDispatch()
  const transactions = useAppSelector((state) => state.expense.data)

  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    dispatch(utilityActions.setHeader({ title: 'Transactions' , goBack: true }))
    dispatch(fetchExpenses()).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  const groupedTransactions = groupByDate(transactions)

  return (
    <>
    <div className="container max-h-screen p-4 flex flex-col">
      <div className="flex-grow overflow-y-scroll mt-4 grid grid-cols-1 gap-4  px-2 scrollbar">
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


    </div>

    
    </>
  )
}

export default Transaction

function groupByDate(transactions : Expense[]){
  return transactions.reduce((acc, transaction) => {
    const date = moment(transaction.date).format('DD MMM YYYY')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {} as Record<string, Expense[]>)
}