import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import withAuth from "@/navigation/withAuth"
import { expenseService } from "@/services/expenseService"
import Expense from "@/types/Expense"
import moment from "moment"
import React, { useEffect } from "react"


type Props = {}

const Home = (_: Props) => {

  const [loading, setLoading] = React.useState(true)
  const [transactions, setTransactions] = React.useState<Expense[]>([])

  useEffect(() => {
    expenseService.getTransactions(5).then((data) => {
      setLoading(false)
      setTransactions(data)
      console.log(data)
    })
  }
    , [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-4 w-full">

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Here are the recent transactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {
            transactions.map((transaction) => {
              const amt = transaction.received ?? 0 - (transaction.paid ?? 0)
              const positive = amt > 0 ? true : false
              return(
              <div key={transaction.id}>
                <div className="mb-8 grid grid-cols-[28px_1fr_auto] items-start pb-8 last:mb-0 last:pb-0">
                  <span className={`flex h-4 w-4 rounded-full translate-y-1 ${positive ? `bg-green-500` : `bg-red-500`}`}></span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{transaction.description}</p>
                  </div>
                  <div>
                  <p className="text-l font-semibold"> {
                    Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format(transaction.received ?? 0 - (transaction.paid ?? 0))
                    }</p>
                  <p className="text-xs text-right text-gray-400">{moment(transaction.date).format("DD MMM YY") }</p>
                  </div>
                </div>
              </div>

            )})
          }

        </CardContent>
        <CardFooter>
          <Button>View All</Button>
        </CardFooter>
      </Card>







    </div>
  )
}

export default withAuth(Home)