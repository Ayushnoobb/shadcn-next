const ContentContainer : React.FC<{
  children : React.ReactNode
}> = ({
  children
}) => {
  return(
    <div className="border bg-card text-card-foreground shadow rounded-lg border-none mt-6 min-h-[50vh] p-6">
      {
        children
      }
    </div>
  )
}

export default ContentContainer