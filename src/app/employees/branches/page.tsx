'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav"
import CommonContainer from "@/components/elements/CommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { PageHeading } from "@/components/ui/title"
import AppContextProvider from "@/helpers/contexts/AppContextProvider"
import { defaultFetcher } from "@/helpers/fetch.helper"
import PrivateView from "@/views/privateView"
import useSWR from "swr"
import BranchActionModal from "./_partials/BranchActionModal"
import BranchListTable from "./_partials/BranchListTable"
import Paginator from "@/components/common/Pagination/Paginator"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const BranchPageIndex = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const AllBrachListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/branch/list`
    const { data : AllBrachList , isLoading , mutate} = useSWR(AllBrachListURL , defaultFetcher)
    
    return(
        <>
            <AppContextProvider>
                <PrivateView>
                    <CommonContainer>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <PageHeading>Branches</PageHeading>
                                <BreadCrumbNav breadCrumbItems={[
                                    {
                                        title : 'Dashboard',
                                        href : '/'
                                    },
                                    {
                                        title : 'Employees',
                                        href : '/employees'
                                    },
                                    {
                                        title : 'Branches',
                                        href : '/branches'
                                    },
                                ]}/>
                            </div>
                            <div>
                                <Button onClick={() => {setIsModalOpen(true)}}>
                                    <Plus />
                                    Add Branch
                                </Button>
                            </div>
                            <BranchActionModal
                                mode="add"
                                mutate={mutate}
                                isOpen={isModalOpen}
                                onOpenChange={setIsModalOpen}
                            />
                        </div>
                        <ContentContainer>
                            <BranchListTable data={AllBrachList?.data} sn={AllBrachList?.meta?.from} mutate={mutate}/>
                            <Paginator 
                                currentPage={1}
                                totalPages={10}
                                onPageChange={() => {}}
                                showPreviousNext
                            />
                        </ContentContainer>
                        
                    </CommonContainer>

                </PrivateView>
            </AppContextProvider>
        </>
    )
}

export default BranchPageIndex