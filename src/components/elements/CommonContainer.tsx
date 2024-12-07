const CommonContainer: React.FC<{children : React.ReactNode}> = ({
  children
}) => {
  return(
    <div className="container pt-8 pb-8 px-4 sm:px-8 mx-auto">{children}</div>
  )
}

export default CommonContainer