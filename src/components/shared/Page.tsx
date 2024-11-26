import React from 'react'
import Header from './Header'

type Props = {
  children: React.ReactNode
  title ?: string
  goBack ?: boolean
  headerChildren ?: React.ReactNode
}

const Page = (props: Props) => {
  return (
    <div className='flex-grow flex flex-col'>
    <Header title={props.title} onGoBack={props.goBack} children={props.headerChildren} />
    <main className='flex-1 max-h-[calc(100vh-4rem)] overflow-y-scroll scrollbar flex flex-col'>
      {props.children}
    </main>
    </div>
  )
}

export default Page