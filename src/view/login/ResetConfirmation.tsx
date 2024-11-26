import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { REGISTER } from '@/navigation/route';
import { authService } from '@/services/authService';
import { LoaderCircle, LogInIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


type Props = {}

const ResetPassword = (_: Props) => {

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  try {
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    console.log(email)
    await authService.resetPassword(email)
    
  } catch (error : any) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-10">
      <h1 className="text-3xl font-bold mb-12">
        Reset Password
      </h1>
      <form onSubmit={onSubmit} className="space-y-4 w-full flex flex-col justify-center">

        <Label htmlFor="email">Email</Label>
        <Input required name="email" type="email" />

        {error && <p className="text-center text-red-500 text-sm p-2">{error}</p>}

        <Button type="submit" disabled={loading}>
          {
            loading ? <LoaderCircle className="animate-spin" /> : <LogInIcon />
          }
          <span>Reset Password</span>
        </Button>
      </form>

      <div className='flex gap-2 justify-center  mt-4'>
        <Button variant={'link'} onClick={() => navigate(REGISTER)} className="mt-4">
          Don't have an account?<span>Register</span>
        </Button>
      </div>


    </div>
  )
}

export default ResetPassword