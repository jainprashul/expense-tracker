import Loading from "@/components/shared/Loading"
import MiniTransaction from "@/components/shared/MiniTransaction"
import Page from "@/components/shared/Page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import withAuth from "@/navigation/withAuth"
import { expenseService } from "@/services/expenseService"
import Expense from "@/types/Expense"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


type Props = {}

const Home = (_: Props) => {

  const [loading, setLoading] = React.useState(true)
  const [transactions, setTransactions] = React.useState<Expense[]>([])
  const navigate = useNavigate()

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
    <Page >
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
            transactions.map((transaction) =>
              <MiniTransaction key={transaction.id} transaction={transaction} />)
          }

        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/transactions')}>View All</Button>
        </CardFooter>
      </Card>
    </div>
    </Page>
  )
}

export default withAuth(Home)


