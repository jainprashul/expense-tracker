import Transaction from "@/types/Transaction"
import moment from "moment"
import { Badge } from "../ui/badge"
import { MoveDownLeft, MoveUpRight } from "lucide-react"

type Props = {
  transaction : Transaction
}

function MiniTransaction({ transaction }: Props) {
  
  const renderTransaction = (transaction: Transaction, amt: number, extra: boolean = false) => {
    const positive = amt > 0;
    return (
      <div key={transaction.id + (extra ? '-extra' : '')} className="grid grid-cols-[32px_1fr_auto] items-center last:mb-0 last:pb-0">
        {positive ? 
          <MoveDownLeft className=" text-green-500" /> :
          <MoveUpRight className=" text-red-500" /> 
        }
        <div className="space-y-1">
          <p className="text-sm font-semibold">{transaction.description}</p>
          <div className="flex space-x-1 items-center">
            <Badge className="bg-zinc-700 text-gray-400">{transaction.type}</Badge>
            <span className="text-xs text-gray-400">{transaction.notes}</span>
          </div>
        </div>
        <div>
          <p className="text-l font-semibold"> {
            Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR'
            }).format(amt)
          }</p>
          <p className="text-xs text-right text-gray-400">{moment(transaction.date).format("DD MMM YY")}</p>
        </div>
      </div>
  )
  }
  return (
   <>
      {transaction.paid && renderTransaction(transaction, (- transaction.paid))}
      {transaction.received && renderTransaction(transaction, transaction.received, true )}
   </>

  )
}

export default MiniTransaction