import Loader from "@/components/elements/Loader";
import SelectField from "@/components/Forms/SelectField";
import { Button } from "@/components/ui/button";
import { ChoiceType } from "@/helpers/commonSchema/common.schema";
import { AuthContext } from "@/helpers/contexts/AuthContextProvider";
import { collectionToOptions } from "@/helpers/option.helper";
import { useContext, useEffect, useState } from "react";

const SelectCompany = () => {

    const { selectedCompany , companies ,  changeSelectedCompany , loadingSelectedCompany } = useContext(AuthContext);
    const [currentSelectedCompany , setCurrentSelectedCompany ] = useState<string | null>(null)

    let CompaniesOptions = (companies && collectionToOptions(companies as [])) ?? [];


    const handleChange = (company_id : string) => {
        setCurrentSelectedCompany(company_id)
    }

    useEffect(() => {
        if(selectedCompany) setCurrentSelectedCompany(selectedCompany?.id)
            console.log(CompaniesOptions?.find((company : any) => company?.id === selectedCompany?.id))
    },[selectedCompany])


    return(
        <>
            <SelectField 
                label="Select Company"
                labelStyle="label-top"
                name="selected-company"
                options={CompaniesOptions}
                defaultValue={CompaniesOptions.find((company : any) => company?.id === selectedCompany?.id)?.value}
                onChange={(e : ChoiceType) => { handleChange(e.value as string) }}
            />
            <div className="w-fit ml-auto">
                <Button className="mt-2" 
                    onClick={() => changeSelectedCompany(currentSelectedCompany!)} 
                    disabled={currentSelectedCompany == null || loadingSelectedCompany as boolean}
                >
                        Submit {
                            loadingSelectedCompany && <Loader />
                        }
                </Button>
            </div>
        </>
    )
}

export default SelectCompany