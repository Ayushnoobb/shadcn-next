const CommonContainer: React.FC<{children : React.ReactNode}> = ({
  children
}) => {
  return(
    <div className="container py-4 px-4 sm:px-8 mx-auto">{children}</div>
  )
}

export default CommonContainer