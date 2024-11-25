import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/services/authService'
import { AlertCircle, LoaderCircle, LogInIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Signup = (_: Props) => {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const [error, setError] = React.useState('')

  async function onSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const form = new FormData(e.currentTarget)

      if(form.get('password') !== form.get('r-password')) {
        throw new Error('Passwords do not match')
        return
      }

      const payload = {
        email: form.get('email') as string,
        password: form.get('password') as string,
      }

      await authService.signup(payload.email, payload.password)

      navigate('/', {
        replace: true
      })
      
    } catch (error : any ) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }

    
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-10">
      <h1 className="text-3xl font-bold mb-12">Register</h1>
      <form onSubmit={onSubmit} className="space-y-4 w-full flex flex-col justify-center">
        <Label htmlFor="email">Email</Label>
        <Input required name="email" type="email" />

        <Label htmlFor="password">Password</Label>
        <Input required name="password" type="password" />
        <Label htmlFor="password">Repeat Password</Label>
        <Input required name="r-password" type="password" />

        {error &&  <div className='flex gap-1 justify-center text-red-500 p-2'>
          <AlertCircle /> <span>{error}</span>
        </div>}

        <Button type="submit" disabled={loading}>
          {
            loading ? <LoaderCircle className="animate-spin" /> : <LogInIcon />
          }

          <span>Signup</span>
        </Button>

        <Button variant={'link'} type="button" onClick={() => navigate('/login')}>
          <span>Already have an account? Login</span>
        </Button>



      </form>

    </div>
  )
}

export default Signup