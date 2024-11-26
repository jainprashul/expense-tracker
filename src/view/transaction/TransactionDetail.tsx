import Page from '@/components/shared/Page'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TRANSACTIONS } from '@/navigation/route'
import { transactionService } from '@/services/expenseService'
import { useAppSelector } from '@/store/hooks'
import clsx from 'clsx'
import { DeleteIcon, Edit2 } from 'lucide-react'
import moment from 'moment'
import { useMemo } from 'react'
import { useNavigate, } from 'react-router-dom'
import { toast } from 'sonner'

type Props = {}

const TransactionDetail = (_: Props) => {
  const navigate = useNavigate()

  const currentTransaction = useAppSelector(s => s.expense.current);

  const transactionType = (currentTransaction?.received ?? 0) - (currentTransaction?.paid ?? 0) > 0 ? 'Received' : 'Paid'

  const categories = useAppSelector(s => s.expense.categories)

  const category = useMemo(() => {
    return categories.find(c => c.id === currentTransaction?.category)?.name
  }, [categories, currentTransaction?.category])


  async function handleDelete() {
    // Delete the transaction
    if (!currentTransaction) return
    await transactionService.deleteTransaction(currentTransaction?.id!)

    toast.success('Transaction Deleted')
    navigate(TRANSACTIONS , { replace: true })

  }

  function handleEdit() {
    // Edit the transaction
    navigate(`/transaction/${currentTransaction?.id}/edit`)

  }


  return (
    <Page title="Transaction Detail" goBack>
      <div className="p-4">

        <div className="text-center">
          <h2 className={
            clsx("text-3xl inline-flex items-center gap-1 font-semibold mt-4",
              transactionType == 'Received' ? 'text-green-500' : 'text-red-500'
            )
          }>
            {
              Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
              }).format(currentTransaction?.paid || currentTransaction?.received || 0)
            }
          </h2>

          <h4 className="text-xl font-semibold mt-2">
            {currentTransaction?.description}
          </h4>
        </div>


        <h3 className="mt-5 text-lg font-semibold">Transaction Details</h3>
        <hr className="my-2" />
        <div>
          <div className="flex justify-between">
            <span className="text-gray-500">
              Payment Method
            </span>
            <span>{currentTransaction?.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">
              Type of Transaction
            </span>
            <span>{transactionType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span>{moment(currentTransaction?.date).format('ll')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Category</span>
            <span>{category}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Note</span>
            <span>{currentTransaction?.notes}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex *:flex-1 justify-center gap-4 mt-8">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit2 /> Edit
          </Button>
        
        <DeleteTransactionDialog handleDelete={handleDelete} />
        </div>


      </div>
    </Page>
  )
}

export default TransactionDetail


type DeleteProps = {
  handleDelete: () => void
}


function DeleteTransactionDialog({ handleDelete } : DeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger> 
        <Button className='w-full' variant="destructive">
          <DeleteIcon /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

}