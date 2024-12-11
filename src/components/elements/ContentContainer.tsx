const ContentContainer : React.FC<{
  children : React.ReactNode , 
  className? : string
}> = ({
  children , 
  className
}) => {
  return(
    <div className={`border bg-card text-card-foreground shadow rounded-lg border-none mt-6 min-h-[50vh] p-6 mb-16 ${className}`}>
      {
        children
      }
    </div>
  )
}

export default ContentContainer