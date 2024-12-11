const CommonContainer: React.FC<{children : React.ReactNode , className? :string}> = ({
  children , 
  className
}) => {
  return(
    <div className={`container py-4 px-4 sm:px-8 mx-auto ${className}`}>{children}</div>
  )
}

export default CommonContainer