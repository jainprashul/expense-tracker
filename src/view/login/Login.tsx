import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { authService } from '@/services/authService';
import {  LoaderCircle, LogInIcon } from 'lucide-react';
import React from 'react';
import {  useNavigate } from 'react-router-dom';

type Schema = {
  email: string;
  password: string;
}

type Props = {}

const Login = (_: Props) => {

  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setLoading(true)
      const form = new FormData(e.currentTarget)
      const payload: Schema = {
        email: form.get('email') as string,
        password: form.get('password') as string
      }
      console.log(payload)
      const session = await authService.login(payload.email, payload.password);
      console.log(session)

      navigate('/', {
        replace: true
      })


    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }


  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-10">
      <h1 className="text-3xl font-bold mb-12">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4 w-full flex flex-col justify-center">
        <Label htmlFor="email">Email</Label>
        <Input required name="email" type="email" />

        <Label htmlFor="password">Password</Label>
        <Input required name="password" type="password" />

        <Button type="submit" disabled={loading}>
          {
            loading ?<LoaderCircle className="animate-spin" /> : <LogInIcon /> 
          }

          <span>Login</span>  
        </Button>

      </form>

    </div>
  )
}

export default Login