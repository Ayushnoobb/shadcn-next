'use client'
import AppContextProvider from "@/helpers/contexts/AppContextProvider"
import PrivateView from "@/views/privateView"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import SelectCompany from "./_partials/SelectCompany"

const SelectCompanyIndexPage : React.FC = () => {

    const [openDialog , setDialog] = useState<boolean>(true)
    

    // const loadOptions = async (
    //     inputValue: string,
    //     callback: (options: any[]) => void
    //   ) => {
    //     try {
    //       const optionsResponse = await fetch(
    //         `${process.env.TMS_HOST}/api/instructor/list?name=${inputValue}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${tmsAccessToken()}`,
    //             Accept: 'application/json',
    //           },
    //         }
    //       );
    //       const optionsData = await optionsResponse.json();
    //       const batchOptions = collectionToOptions(optionsData?.data);
    //       callback(batchOptions);
    //     } catch (error: any) {
    //       callback([]);
    //     }
    // };


    return(
        <>
            <AppContextProvider>
                <PrivateView>            
                    <Dialog open={openDialog} onOpenChange={setDialog}>
                        <DialogContent hideCloseButton disableClose>
                                <DialogTitle className="text-lg font-semibold">Please select your company</DialogTitle>
                                <DialogDescription>
                                    <SelectCompany />
                                </DialogDescription>
                        </DialogContent>
                    </Dialog>
                </PrivateView>
            </AppContextProvider>
        </>
    )
}

export default SelectCompanyIndexPage