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
import React, { FormEvent, useContext, useEffect, useState } from "react"
import FormInput from "@/components/Forms/InputFields"
import Loader from "@/components/elements/Loader"
import NepaliDateField from "@/components/Forms/NepaliDateField"
import { SettingsContext } from "@/helpers/contexts/AppSettingContextProvider"

interface BranchActionModalProps {
  mode: 'add' | 'edit'
  initialData?: any
  buttonClassName?: string 
  mutate: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const BranchActionModal: React.FC<BranchActionModalProps> = ({
  mode,
  initialData,
  buttonClassName,
  mutate,
  isOpen,
  onOpenChange
}) => {

  const { calendar } = useContext(SettingsContext)
  const [formData, setFormData] = useState<Record<string,any>>(initialData || {})
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Record<string ,any>>({})
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
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

  const handleFormSubmit = async (e : FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try{
        const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/branch/${mode == 'edit' ? `update/${initialData?.id}` : `store`}`
        const res = await fetch(submitURL , {
          method : 'POST' , 
          body  : formData , 
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
            variant : 'success' ,
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleFormSubmit}>
            <DialogHeader>
                <DialogTitle>
                    {mode === 'add' ? 'Add New Branch' : 'Edit Branch'}
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
                        placeholder="Enter branch name"
                    />
                </div>
                <div className="">
                    <FormInput
                        label="Location"
                        id="location"
                        name="location"
                        labelPosition="top"
                        value={formData.location}
                        defaultValue={formData?.location ?? ''}
                        error={error?.location}
                        onChange={handleInputChange}
                        placeholder="Enter location"
                    />
                </div>
                <div className="">
                    <FormInput
                        label="Contact Number"
                        id="contact"
                        name="contact_number"
                        type="number"
                        labelPosition="top"
                        value={formData.contact_number}
                        defaultValue={formData?.contact_number ?? null}
                        error={error?.contact_number}
                        onChange={handleInputChange}
                        placeholder="Enter contact"
                    />
                </div>
                <div className="">
                  {
                    calendar === 'nepali' ? (
                      <NepaliDateField 
                        label="Established Date"
                        onChange={(e  :any) => setFormData((prev : Record<string,any>) => ({...prev , 'established_date_nepali' : e.bsDate}))}
                        labelStyle="label-top"
                        id="established_date_nepali"
                        value={formData.established_date_nepali}
                        defaultValue={formData?.established_date_nepali ?? null}
                        fieldErrors={error?.established_date_nepali}
                      />
                    ) : (
                      <FormInput
                          label="Established Date"
                          id="established_date"
                          name="established_date"
                          type="date"
                          labelPosition="top"
                          value={formData.established_date}
                          defaultValue={formData?.established_date ?? null}
                          error={error?.established_date}
                          onChange={handleInputChange}
                          placeholder="Enter established_date"
                      />
                    )
                  }
                </div>
            </div>
            <DialogFooter>
                <Button 
                    type="submit" 
                    className="mt-8"
                    disabled={isLoading}
                >
                    {mode === 'add' ? 'Create Branch' : 'Save Changes'}
                    {isLoading && <Loader />}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BranchActionModal