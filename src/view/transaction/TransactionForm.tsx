import { DatePicker } from '@/components/shared/DatePicker'
import Page from '@/components/shared/Page'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { TRANSACTIONS } from '@/navigation/route'
import { transactionService } from '@/services/expenseService'
import { useAppSelector } from '@/store/hooks'
import Transaction from '@/types/Transaction'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { LoaderIcon, MoveDownLeftIcon, MoveUpRightIcon, SquarePlus } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type Props = {
  edit ?: boolean
}

const TransactionForm = ({
  edit
} : Props) => {
  const navigate = useNavigate();

  const transaction = useAppSelector((state) => state.expense.current);

  const [loading, setLoading] = React.useState(false)

  const _type = transaction?.received ?? 0 - transaction?.paid! > 0 ? 'income' : 'expense'

  const amt = transaction?.received ?? transaction?.paid

  const [type, setType] = React.useState(_type);
  const [date, setDate] = React.useState(transaction?.date ? new Date(transaction.date) : new Date());

  const categories = useAppSelector((state) => state.expense.categories)

  function resetForm() {
    setType('expense')
    setDate(new Date())
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setLoading(true)
      const form = e.currentTarget
      const formData = new FormData(form)
      const data: Transaction = {
        type: formData.get('type') as string,
        description: formData.get('description') as string | undefined,
        notes: formData.get('note') as string,
        category: parseInt(formData.get('category') as string),
        date : moment(date).format('YYYY-MM-DD')
      }
      if (type === 'expense') {
        data.paid = parseFloat(formData.get('amt') as string)
      } else {
        data.received = parseFloat(formData.get('amt') as string)
      }

      if (edit && transaction) {
        data.id = transaction?.id
        await transactionService.updateTransaction(data)
        toast.success('Transaction updated successfully')
      } else {
        await transactionService.addTransaction(data)
        toast.success('Transaction added successfully')
      }

      resetForm()
      form.reset()

      navigate(TRANSACTIONS, { replace: true })

    } catch (error) {
      toast.error('Failed to add transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title={
      `${edit ? 'Edit' : 'Add'} Transaction`
    } goBack>
      <form className="" onSubmit={handleSubmit}>
        <Card className='mt-4 mx-2'>
          <CardContent className='space-y-4'> 
        <h2 className="text-xl text-center font-semibold my-10">{edit ? 'Edit' : 'Add'} Transaction</h2>

        <div className="flex justify-center items-center flex-col gap-2">
          <input required className='bg-transparent border h-16 w-80 !text-2xl text-center rounded-full' type='text' inputMode='numeric' pattern='[0-9]*' name='amt' placeholder="Amount" defaultValue={amt} />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5 h-10 rounded-md border">
          <ToggleGroup className='flex *:flex-1' type="single" value={type} onValueChange={setType} >
            <ToggleGroupItem value="expense" aria-label="Expense">
              <MoveUpRightIcon className="h-4 w-4 text-red-600" /> Expense
            </ToggleGroupItem>
            <ToggleGroupItem value="income" aria-label="Income">
              <MoveDownLeftIcon className="h-4 w-4 text-green-600" /> Income
            </ToggleGroupItem>

          </ToggleGroup>
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="type">Description</Label>
          <Input required type="text" id="Description" name='description' placeholder="Description" defaultValue={transaction?.description} />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="date">Date</Label>
          <DatePicker selected={date} onSelect={(date) => {
            setDate(date)
          }} />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="type">Type</Label>
          <Input required type="text" id="type" name='type' defaultValue={transaction?.type} placeholder="Type" />
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label >Category</Label>
          <Select name='category' defaultValue={transaction?.category?.toString()}  >
          <SelectTrigger className="mt-2">
          <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {
              // month with year with the format MMM YYYY with the current month selected by default 
              categories.map(c => (
                <SelectItem key={c.id} value={c.id!.toString()}>
                  {c.name}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
          
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" name='note' placeholder="Note" defaultValue={transaction?.notes} className='resize-none h-24' />
        </div>

        <Button disabled={loading} type='submit' className='w-full'>
          {loading ? <LoaderIcon className='animate-spin' /> : <> <SquarePlus className='mr-2' /> Save & Continue </>}
        </Button>
        </CardContent>
        </Card>
      </form>
    </Page>
  )
}

export default TransactionForm