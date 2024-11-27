import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/services/authService"
import { Loader } from "lucide-react"
import React from "react"
import { toast } from "sonner"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export function PasswordUpdateDialog({ open, setOpen }: Props) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      setLoading(true)
      setError('')
      const data = new FormData(e.currentTarget)

      const password = data.get('password') as string
      const rPassword = data.get('r-password') as string

      if (password !== rPassword) {
        throw new Error('Passwords do not match')
      }

      await authService.updateUserPassword(password)
      toast.success('Password updated successfully')
      setOpen(false)
    } catch (error : any) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update password</DialogTitle>
            <DialogDescription>
              Make changes to password here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Password
              </Label>
              <Input id="name" name='password'  className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Re-enter Password
              </Label>
              <Input id="phone" name="r-password" className="col-span-3" />
            </div>
          </div>
          {
            error && <p className="text-red-500 my-2">{error}</p>
          }
          <DialogFooter>
            <Button disabled={loading} type="submit">
              {loading ? <Loader className="animate-spin" size={16} />
               : 'Save changes'}
            </Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}
