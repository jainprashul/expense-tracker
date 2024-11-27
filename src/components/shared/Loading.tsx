
type Props = {
  overlay?: boolean
}

const Loading = ({
  overlay = false
}: Props) => {
  if (!overlay) {
    return (
      <div className="z-50 flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }
  return ( 
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

export default Loading