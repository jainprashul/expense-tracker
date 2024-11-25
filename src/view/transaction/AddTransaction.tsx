import { DatePicker } from '@/components/shared/DatePicker'
import Page from '@/components/shared/Page'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { transactionService } from '@/services/expenseService'
import Transaction from '@/types/Transaction'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { MoveDownLeftIcon, MoveUpRightIcon, SquarePlus } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

type Props = {}

const AddTransaction = (_: Props) => {

  const dateRef = React.useRef<HTMLInputElement>(null)
  const [type, setType] = React.useState('expense')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const data: Transaction = {
        type: formData.get('type') as string,
        description: formData.get('description') as string | undefined,
        date: formData.get('date') as string,
        notes: formData.get('note') as string,
      }
      if (type === 'expense') {
        data.paid = parseFloat(formData.get('amt') as string)
      } else {
        data.received = parseFloat(formData.get('amt') as string)
      }

      console.log(data)
      await transactionService.addTransaction(data)
      toast.success('Transaction added successfully')
      form.reset()
    } catch (error) {
      toast.error('Failed to add transaction')
    }


  }

  return (
    <Page title="Add Transaction" goBack>
      <form className="mx-auto p-8" onSubmit={handleSubmit}>
        <Card>
          <CardContent className='sm:p-4 md:p-16 space-y-3 '> 

        <h2 className="text-xl text-center font-semibold mb-10">Add Transaction</h2>

        <div className="flex justify-center items-center flex-col gap-2">
          <input prefix='₹' required className='bg-transparent border h-16 w-80 !text-2xl text-center rounded-full' type='text' pattern='[0-9]*' name='amt' placeholder="Amount" />
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
          <Input required type="text" id="Description" name='description' placeholder="Description" />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="date">Date</Label>
          <DatePicker selected={new Date()} onSelect={(date) => {
            if (dateRef.current) {
              dateRef.current.value = moment(date).format('YYYY-MM-DD')
            }
          }} />

          <input ref={dateRef} name="date" className='hidden' />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="type">Type</Label>
          <Input required type="text" id="type" name='type' placeholder="Type" />
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" name='note' placeholder="Note" className='resize-none h-24' />
        </div>

        <Button type='submit' className='w-full'>
          <SquarePlus className='mr-2' /> Add Transaction
        </Button>
        </CardContent>
        </Card>
      </form>
    </Page>
  )
}

export default AddTransaction