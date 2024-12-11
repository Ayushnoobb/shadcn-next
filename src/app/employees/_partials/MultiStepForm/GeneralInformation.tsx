import FormSection from "@/components/elements/FormSection";
import SelectField from "@/components/Forms/SelectField";
import { hrmsAccessToken } from "@/helpers/token.helper";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import ProfileImageUpload from "../EmployeeProfile";
import FormInput from "@/components/Forms/InputFields";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { collectionToOptions, objectToOptions } from "@/helpers/option.helper";
import { ChoiceType } from "@/helpers/commonSchema/common.schema";

const GeneralInformation = ({
  changeNext
} : { changeNext : () => void }) => {

    const { toast } = useToast();
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, any>>({});

    const genderListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/data/gender`
    const maritalStatusListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/data/marital-status`
    const bloodGroupListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/data/blood-group`
    const religionListURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/data/religion`

    const {data : genderList} = useSWR(genderListURL , defaultFetcher)
    const {data : maritalStatusList} = useSWR(maritalStatusListURL , defaultFetcher)
    const {data : bloodGroupList} = useSWR(bloodGroupListURL , defaultFetcher)
    const {data : religionList} = useSWR(religionListURL , defaultFetcher)

    const genderOptionList: ChoiceType[] = genderList?.data?.length > 0 
    ? objectToOptions(genderList?.data) 
    : [];
  
  const maritalOptionList: ChoiceType[] = maritalStatusList?.data?.length > 0 
    ? objectToOptions(maritalStatusList?.data) 
    : [];
  
  const bloodGroupOptionList: ChoiceType[] = bloodGroupList?.data?.length > 0 
    ? objectToOptions(bloodGroupList?.data) 
    : [];
  
  const religionOptionList: ChoiceType[] = religionList?.data?.length > 0 
    ? objectToOptions(religionList?.data) 
    : [];
  

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSelectChange = (key: string, value: string): void => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const handleImageUpload = (file: File) : void => {
      setFormData((prev) => ({
        ...prev,
        profile_image: file
      }));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      const formDataToSend = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'profile_image' && formData[key] instanceof File) {
          formDataToSend.append('profile_image', formData[key]);
        } else if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      try {
        const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/store`;
        
        const res = await fetch(submitURL, {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${hrmsAccessToken()}`,
            Accept: 'application/json'
          },
        });
        
        const data = await res.json();
        
        if (data?.success) {
          setFormData({});
          toast({
            title: `Successfully Created!`,
            description: data?.message,
          });
        } else {
          setError(data?.errors);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: data?.message,
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error?.message,
        });
      } finally {
        setLoading(false);
      }
    };

    
    return(
        <FormSection title="General Information">
            <form onSubmit={handleFormSubmit}>
                <div className="mt-4">
                    <ProfileImageUpload onImageUpload={handleImageUpload} imagePath={null}/>
                </div>
                <div className="grid  mt-6 grid-cols-1 md:grid-cols-2 md:gap-6 gap-2">
                    <FormInput
                        label="Name"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        error={error?.name}
                        placeholder="Enter name"
                    />
                    <FormInput
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        error={error?.email}
                        placeholder="Enter email"
                    />
                    <FormInput
                        label="Mobile"
                        id="mobile"
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        error={error?.mobile}
                        placeholder="Enter mobile"
                    />
                    <FormInput
                        label="Address"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        error={error?.address}
                        placeholder="Enter address"
                    />
                    <SelectField
                        label="Gender"
                        id="gender"
                        name="gender"
                        options={genderOptionList}
                        value={formData.gender}
                        onChange={(e :any) => handleSelectChange('gender',e.value)}
                        fieldErrors={error?.gender}
                    />
                    <FormInput
                        label="Date of Birth"
                        id="dob"
                        name="date_of_birth"
                        type="date"
                        required
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        error={error?.date_of_birth} 
                      />
                    <SelectField
                      label="Marital Status"
                      id="marital_status"
                      name="marital_status"
                      options={maritalOptionList}
                      value={formData.marital_status}
                      onChange={(e :any) => handleSelectChange('marital_status',e.value)}
                      fieldErrors={error?.marital_status}
                    />
                    <SelectField
                        label="Religion"
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        options={religionOptionList}
                        onChange={(e :any) => handleSelectChange('religion',e.value)}
                        fieldErrors={error?.religion}
                        placeholder="Enter religion"
                    />
                    <SelectField
                        label="Blood Group"
                        id="blood_group"
                        name="blood_group"
                        options={bloodGroupOptionList}
                        value={formData.blood_group}
                        onChange={(e :any) => handleSelectChange('blood_group',e.value)}
                        fieldErrors={error?.blood_group}
                    />
                </div>
            </form>
        </FormSection>
    )
}

export default GeneralInformation