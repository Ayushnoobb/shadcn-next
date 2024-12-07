import SidebarProvider from "./SidebarContextProvider"

const AppContextProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
  return(
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}

export default AppContextProvider