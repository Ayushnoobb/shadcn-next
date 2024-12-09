export const PageHeading: React.FC<{children : React.ReactNode}>  = ({
    children
}) => {
    return(
        <>  
            <h2 className="text-3xl mb-1 font-semibold">{children}</h2>
        </>
    )
}