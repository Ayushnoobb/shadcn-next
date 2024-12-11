'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav"
import CommonContainer from "@/components/elements/CommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { PageHeading } from "@/components/ui/title"
import AppContextProvider from "@/helpers/contexts/AppContextProvider"
import PrivateView from "@/views/privateView"
import EmployeeProfile from "./_partials/EmployeeProfile"

const EmployeeIndividualPage : React.FC = () => {
    return(
        <AppContextProvider>
            <PrivateView>
                <CommonContainer>
                    <div className="">
                        <BreadCrumbNav breadCrumbItems={[
                            {
                                title : 'Dashboard',
                                href : '/'
                            },
                            {
                                title : 'Employees',
                                href : '/employees'
                            },
                            
                        ]}/>
                    </div>
                    <ContentContainer>
                        <EmployeeProfile />
                    </ContentContainer>
                </CommonContainer>
            </PrivateView>
        </AppContextProvider>
    )
}

export default EmployeeIndividualPage