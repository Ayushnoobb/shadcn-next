import React, { useState, FormEvent } from "react";
import FormSection from "@/components/elements/FormSection";
import FormInput from "@/components/Forms/InputFields";
import { useToast } from "@/hooks/use-toast";
import { hrmsAccessToken } from "@/helpers/token.helper";
import DropZone from "@/components/Forms/DropZone";

const EmployeeEducationForm = ({
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
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/education/store`;
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
    <FormSection title="Employee Education">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormInput
            label="Degree"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            error={error?.degree}
          />
          <FormInput
            label="Field of Study"
            id="field_of_study"
            name="field_of_study"
            value={formData.field_of_study}
            onChange={handleInputChange}
            error={error?.field_of_study}
          />
          <FormInput
            label="Institution"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            error={error?.institution}
          />
          <FormInput
            label="University/Board"
            id="university_board"
            name="university_board"
            value={formData.university_board}
            onChange={handleInputChange}
            error={error?.university_board}
          />
          
          <DropZone 
            title="Certificate"
            handleFileChange={handleFileChange}
            name="certificate"
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

export default EmployeeEducationForm;
