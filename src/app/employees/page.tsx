'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav"
import CommonContainer from "@/components/elements/CommonContainer"
import { Button } from "@/components/ui/button"
import { PageHeading } from "@/components/ui/title"
import AppContextProvider from "@/helpers/contexts/AppContextProvider"
import PrivateView from "@/views/privateView"
import { Plus } from "lucide-react"
import EmployeesActionModal from "./_partials/EmployeesActionModal"
import ContentContainer from "@/components/elements/ContentContainer"
import EmployeeListTable from "./_partials/EmployeeListTable"
import Paginator from "@/components/common/Pagination/Paginator"
import { useState } from "react"
import useSWR from "swr"
import { defaultFetcher } from "@/helpers/fetch.helper"
import { useSearchParams } from "next/navigation"

const EmployeesIndexPage : React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const searchParams = useSearchParams()

    const AllBrachListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/list`
    const { data : AllBrachList , isLoading , mutate} = useSWR(
        searchParams?.toString() == '' ?  AllBrachListURL : AllBrachListURL.concat(`?${searchParams?.toString()}`) , 
        defaultFetcher
    )

    console.log(AllBrachList)

    return(
        <AppContextProvider>
            <PrivateView>
                <CommonContainer>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <PageHeading>Employees</PageHeading>
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
                        <div>
                            <Button onClick={() => {setIsModalOpen(true)}}>
                                <Plus />
                                Add Employees
                            </Button>
                        </div>
                        <EmployeesActionModal
                            mode="add"
                            mutate={mutate}
                            isOpen={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        />
                    </div>
                    <ContentContainer>
                        <EmployeeListTable data={AllBrachList?.data} sn={AllBrachList?.meta?.from} mutate={mutate} isLoading={isLoading}/>
                        <Paginator
                            currentPage={AllBrachList?.meta?.current_page}
                            totalPages={AllBrachList?.meta?.current_page}
                            mutate={mutate}
                            showPreviousNext
                        />
                    </ContentContainer>
                    
                </CommonContainer>

            </PrivateView>
        </AppContextProvider>
    )
}

export default EmployeesIndexPage