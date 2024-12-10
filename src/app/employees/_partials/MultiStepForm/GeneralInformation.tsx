import FormSection from "@/components/elements/FormSection";
import SelectField from "@/components/Forms/SelectField";
import { hrmsAccessToken } from "@/helpers/token.helper";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import ProfileImageUpload from "../EmployeeProfile";
import FormInput from "@/components/Forms/InputFields";

const GeneralInformation = ({
  changeNext
} : { changeNext : () => void }) => {

    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, any>>({});
    const { toast } = useToast();

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
                        options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                        ]}
                        
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
                        error={error?.date_of_birth} />
                        <SelectField
                        label="Marital Status"
                        id="marital_status"
                        name="marital_status"
                        options={[
                            { value: "single", label: "Single" },
                            { value: "married", label: "Married" },
                        ]}
                        value={formData.marital_status}
                        onChange={(e :any) => handleSelectChange('marital_status',e.value)}
                        fieldErrors={error?.marital_status}
                    />
                    <FormInput
                        label="Religion"
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        error={error?.religion}
                        placeholder="Enter religion"
                    />
                    <SelectField
                        label="Blood Group"
                        id="blood_group"
                        name="blood_group"
                        options={[
                            { value: "A+", label: "A+" },
                            { value: "A-", label: "A-" },
                            { value: "B+", label: "B+" },
                            { value: "B-", label: "B-" },
                            { value: "AB+", label: "AB+" },
                            { value: "AB-", label: "AB-" },
                            { value: "O+", label: "O+" },
                            { value: "O-", label: "O-" },
                        ]}
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