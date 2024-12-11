import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { hrmsAccessToken } from "@/helpers/token.helper"
import { useToast } from "@/hooks/use-toast"
import React, { FormEvent, useEffect, useState } from "react"
import FormInput from "@/components/Forms/InputFields"
import Loader from "@/components/elements/Loader"
import useSWR from "swr"
import { defaultFetcher } from "@/helpers/fetch.helper"
import { collectionToOptions } from "@/helpers/option.helper"
import AsyncSelectField from "@/components/Forms/AsyncSelectField"

interface DepartmentActionModalProps {
  mode: 'add' | 'edit'
  initialData?: any
  buttonClassName?: string 
  mutate: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const DepartmentActionModal: React.FC<DepartmentActionModalProps> = ({
  mode,
  initialData,
  buttonClassName,
  mutate,
  isOpen,
  onOpenChange
}) => {

// fetch branch list
    const branchListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/branch/list` 
    const { data : branchList } = useSWR(branchListURL , defaultFetcher)
    let branchListOptions = (branchList?.data?.length > 0 && collectionToOptions(branchList?.data)) ?? []

    console.log(branchListOptions)

    const [formData, setFormData] = useState<Record<string,any>>(initialData || {})
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Record<string ,any>>({})
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const { id, value } = e.target
        setFormData(prev => ({
        ...prev,
        [id]: value
        }))
    }

    const handleSelectChange = (key : string , value : string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
            }))
    }

    const handleFormSubmit = async (e : FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
        setLoading(true)
        const toSendformData = new FormData(e.currentTarget);
        Object.entries(formData).forEach(([key, value]: [string, string], index: number) => {
            // Your logic here
            if(value){
                toSendformData.append(key , value)
            }
        });
        
        try{
            const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/department/${mode == 'edit' ? `update/${initialData?.id}` : `store`}`
            const res = await fetch(submitURL , {
            method : 'POST' , 
            body  : toSendformData , 
            headers : {
                Authorization : `Bearer ${hrmsAccessToken()}`
            }
            })
            const data = await res.json()
            console.log(data)
            if(data?.success){
            setFormData({});
            mutate();
            toast({
                title: `Successfully ${mode == 'edit' ? 'Updated !' : 'Created !'}`,
                description: data?.message,
            }); 
            onOpenChange(false);
            }else{
            setError(data?.error);
            toast({
                variant: "destructive" ,
                title: "Something went wrong",
                description: data?.message,
            }); 
            }
        }catch(error : any){
        toast({
            variant: "destructive" ,
            title: "Something went wrong",
            description: error?.message,
        }); 
        }finally{
        setLoading(false)
        }
    }

        const loadBranchList = async (
            inputValue: string,
            callback: (options: any[]) => void
          ) => {
            try {
              const optionsResponse = await fetch(
                `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/branch/list?name=${inputValue}`,
                {
                  headers: {
                    Authorization: `Bearer ${hrmsAccessToken()}`,
                    Accept: 'application/json',
                  },
                }
              );
              const optionsData = await optionsResponse.json();
              const batchOptions = collectionToOptions(optionsData?.data)
              callback(batchOptions as any);
            } catch (error: any) {
              callback([]);
            }
    }

  useEffect(() => {
    if(initialData){
      setFormData({
        name : initialData?.name ,
        location : initialData?.location , 
        contact_number : initialData?.contact_number,
        established_date : initialData?.established_date
      })
    }
  },[initialData])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleFormSubmit}>
            <DialogHeader>
                <DialogTitle>
                    {mode === 'add' ? 'Add New Department' : 'Edit Department'}
                </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 mt-6">
                <div className="">
                  <FormInput 
                      label="Name"
                      id="name"
                      name="name"
                      labelPosition="top"
                      value={formData.name}
                      defaultValue={formData?.name ?? ''}
                      onChange={handleInputChange}
                      error={error?.name}
                      placeholder="Enter department name"
                  />
                </div>
                <div className="">
                    <AsyncSelectField
                        label="Branch"
                        id="branch_id"
                        labelStyle="label-top"
                        name="branch_id"
                        value={formData.branch_id}
                        defaultValue={formData?.branch_id ?? ''}
                        defaultOptions={(branchListOptions ?? []) as any}
                        loadOptions={loadBranchList}
                        fieldErrors={error?.branch_id}
                        onChange={(e) => handleSelectChange('branch_id' , e.value as string)}
                    />
                    
                </div>
                
            </div>
            <DialogFooter>
                <Button 
                    type="submit" 
                    className="mt-8"
                    disabled={isLoading}
                >
                    {mode === 'add' ? 'Create Department' : 'Save Changes'}
                    {isLoading && <Loader />}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DepartmentActionModal