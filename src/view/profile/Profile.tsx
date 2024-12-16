import Loading from '@/components/shared/Loading'
import Page from '@/components/shared/Page'
import withAuth from '@/navigation/withAuth'
import { useAppSelector } from '@/store/hooks'
import { Edit } from 'lucide-react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { ProfileForm } from './UpdateUserForm'
import { PasswordUpdateDialog } from './UpdatePasswordForm'

type Props = {}

const Profile = (_: Props) => {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Loading />
  }

  useEffect(() => {

  }, [])

  const [open, setOpen] = React.useState(false)
  const [passwordOpen, setPasswordOpen] = React.useState(false)

  function EditIcon() {
    return (
      <Edit color='grey' size={16} onClick={() => {
        setOpen(true)
      }} />
    )
  }

  const avatar = `https://api.multiavatar.com/${user?.email}.png`

  return (
    <Page goBack title="Profile">
      <div className="p-4 mx-auto min-w-[70%]">
        <h1 className="text-center text-2xl font-semibold">User Profile</h1>


        <div className="mt-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <img src={avatar} alt="profile" className="rounded-full h-16 w-16" />
            <div className='text-center'>
              <p className="text-lg font-semibold">{user.user_metadata.name ?? user.email}</p>
              <p className="text-sm text-gray-500">
                <span className="text-gray-500">Joined on </span>
                <span className="text-gray-500">{moment(user.created_at).format('ll')}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Account Information</h3>
          <div className="mt-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className='inline-flex items-center gap-2'>{user.user_metadata.name} <EditIcon /> </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-500">Email</span>
              <span className='inline-flex items-center gap-2'>{user.email} </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-gray-500">Phone</span>
              <span className='inline-flex items-center gap-2'>{user.user_metadata.phone} <EditIcon /> </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Security</h3>
          <div className="mt-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Password</span>
              <span className='inline-flex items-center gap-2'>**********
                <Edit color='grey' size={16} onClick={() => {
                  setPasswordOpen(true)
                }} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProfileForm open={open} setOpen={setOpen} />
      <PasswordUpdateDialog open={passwordOpen} setOpen={setPasswordOpen} />
    </Page>

  )
}

export default withAuth(Profile)