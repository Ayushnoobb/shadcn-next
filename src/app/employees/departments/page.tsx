'use client'
import { useState } from "react"
import { Plus } from "lucide-react"
import useSWR from "swr"

import PrivateView from "@/views/privateView"
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav"
import CommonContainer from "@/components/elements/CommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { PageHeading } from "@/components/ui/title"
import Paginator from "@/components/common/Pagination/Paginator"
import { Button } from "@/components/ui/button"

import DepartmentActionModal from "./_partials/DepartmenActionModal"
import DepartmentListTable from "./_partials/DepartmnetListTable"

import AppContextProvider from "@/helpers/contexts/AppContextProvider"
import { defaultFetcher } from "@/helpers/fetch.helper"
import { routes } from "@/lib/routes"
import { useSearchParams } from "next/navigation"

const DepartmentListIndex = () => {

    const searchParams = useSearchParams()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const AllBrachListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/branch/list`
    const { data : AllBrachList , isLoading , mutate} = useSWR(
        searchParams.toString() == '' ? AllBrachListURL : AllBrachListURL + `?${searchParams.toString()}` , 
        defaultFetcher
    )
    
    return(
        <>
            <AppContextProvider>
                <PrivateView>
                    <CommonContainer>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <PageHeading>Departments</PageHeading>
                                <BreadCrumbNav breadCrumbItems={[
                                    {
                                        title : 'Dashboard',
                                        href : '/'
                                    },
                                    {
                                        title : 'Employees',
                                        href : routes.EMPLOYEE_INDEX
                                    },
                                    {
                                        title : 'Departments',
                                        href : '/branches'
                                    },
                                ]}/>
                            </div>
                            <div>
                                <Button onClick={() => {setIsModalOpen(true)}}>
                                    <Plus />
                                    Add Departments
                                </Button>
                            </div>
                            <DepartmentActionModal
                                mode="add"
                                mutate={mutate}
                                isOpen={isModalOpen}
                                onOpenChange={setIsModalOpen}
                            />
                        </div>
                        <ContentContainer>
                            {
                                // !isLoading ? (
                                // ) : 'loading ...'
                                <DepartmentListTable data={AllBrachList?.data} sn={AllBrachList?.meta?.from} mutate={mutate}/>
                            }
                            <Paginator 
                                currentPage={1}
                                totalPages={10}
                                showPreviousNext
                                mutate={mutate}
                            />
                        </ContentContainer>
                        
                    </CommonContainer>

                </PrivateView>
            </AppContextProvider>
        </>
    )
}

export default DepartmentListIndex