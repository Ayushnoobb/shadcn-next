import { Suspense } from "react"
import { AuthProvider } from "./AuthContextProvider"
import SidebarProvider from "./SidebarContextProvider"
import { SettingsProvider } from "./AppSettingContextProvider"

const AppContextProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
  return(
    <Suspense>
      <AuthProvider>
        <SettingsProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </SettingsProvider>
      </AuthProvider>
    </Suspense>
  )
}

export default AppContextProvider