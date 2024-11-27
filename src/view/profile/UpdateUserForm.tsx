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
import { authActions } from "@/store/context/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Loader } from "lucide-react"
import React from "react"
import { toast } from "sonner"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ProfileForm({ open, setOpen }: Props) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const data = new FormData(e.currentTarget)
      const updatedUser = await authService.updateUserData({
        name: (data.get('name') as string) || user?.user_metadata.name,
        phone: (data.get('phone') as string) || user?.user_metadata.phone,
      })
      dispatch(authActions.setUser(updatedUser.user))
      toast
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name='name' defaultValue={user?.user_metadata.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Phone
              </Label>
              <Input id="phone" name="phone" defaultValue={user?.user_metadata.phone} className="col-span-3" />
            </div>
          </div>
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
