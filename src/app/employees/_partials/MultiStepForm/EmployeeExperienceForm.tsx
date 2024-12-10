import React, { useState, FormEvent } from "react";
import FormSection from "@/components/elements/FormSection";
import FormInput from "@/components/Forms/InputFields";
import { useToast } from "@/hooks/use-toast";
import { hrmsAccessToken } from "@/helpers/token.helper";
import DropZone from "@/components/Forms/DropZone";

const EmployeeExperienceForm = ({
  changeNext
} : { changeNext : () => void }) => {

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (key: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/experience/store`;
      const res = await fetch(submitURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${hrmsAccessToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data?.success) {
        setFormData({});
        toast({ title: "Success", description: data?.message });
      } else {
        setError(data?.errors);
        toast({
          variant: "destructive",
          title: "Error",
          description: data?.message,
        });
      }
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormSection title="Employee Experience">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormInput
            label="Designation"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            error={error?.designation}
          />
          <FormInput
            label="Industry"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            error={error?.industry}
          />
          <FormInput
            label="Job Level"
            id="job_level"
            name="job_level"
            value={formData.job_level}
            onChange={handleInputChange}
            error={error?.job_level}
          />
          <FormInput
            label="Company"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            error={error?.company}
          />
          <DropZone 
            title="Experience Letter"
            handleFileChange={handleFileChange}
            name="experience_letter"
            />
          <FormInput
            label="From"
            id="from"
            name="from"
            type="date"
            value={formData.from}
            onChange={handleInputChange}
            error={error?.from}
          />
          <FormInput
            label="To"
            id="to"
            name="to"
            type="date"
            value={formData.to}
            onChange={handleInputChange}
            error={error?.to}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </FormSection>
  );
};

export default EmployeeExperienceForm;
