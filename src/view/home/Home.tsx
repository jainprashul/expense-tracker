import Loading from "@/components/shared/Loading"
import MiniTransaction from "@/components/shared/MiniTransaction"
import Page from "@/components/shared/Page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import withAuth from "@/navigation/withAuth"
import { transactionService } from "@/services/expenseService"
import Transaction from "@/types/Transaction"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BarChartMonthlyExpense } from "../analytics/BarChartMonthlyExpense"
import { ANALYTICS, TRANSACTION_ADD, TRANSACTIONS } from "@/navigation/route"
import { ChartAreaIcon, PlusCircle } from "lucide-react"


type Props = {}

const Home = (_: Props) => {

  const [loading, setLoading] = React.useState(true)
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    transactionService.getRecentTransactions(5).then((data) => {
      setLoading(false)
      setTransactions(data)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Page >
      <div className="p-4 w-full">
        <BarChartMonthlyExpense />

        <div className="mt-1 p-2 py-4">
          <div className="flex justify-between *:flex-1 gap-2" >
            <Button className="rounded-full" onClick={() => navigate(TRANSACTION_ADD)}> <PlusCircle/> Add Transaction</Button>
            <Button className="rounded-full" onClick={() => navigate(ANALYTICS)}> <ChartAreaIcon /> Analytics</Button>
          </div>
        </div>

        <Card className="mt-1">
          <div className="flex justify-between items-center ">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Here are the recent transactions.
              </CardDescription>
            </CardHeader>
            <Button className="mx-4" size={'sm'} onClick={() => navigate(TRANSACTIONS)}>View All</Button>

          </div>
          <CardContent className="grid">
            {
              transactions.map((transaction) =>
                <MiniTransaction key={transaction.id} transaction={transaction} />)
            }
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}

export default withAuth(Home)


