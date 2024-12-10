import React, { useState, FormEvent } from "react";
import FormSection from "@/components/elements/FormSection";
import { useToast } from "@/hooks/use-toast";
import { hrmsAccessToken } from "@/helpers/token.helper";
import DropZone from "@/components/Forms/DropZone";

const EmployeeDocumentsForm = ({
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

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    try {
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/documents/store`;
      const res = await fetch(submitURL, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${hrmsAccessToken()}`,
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
    <FormSection title="Employee Documents">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <DropZone 
                title="Citizenship Front"
                handleFileChange={handleFileChange}
                name="citizenship_front"
            />
            <DropZone 
                title="Citizenship Back"
                handleFileChange={handleFileChange}
                name="citizenship_back"
            />
            <DropZone 
                title="Driving License"
                handleFileChange={handleFileChange}
                name="driving_license"
            />
            <DropZone 
                title="Passport"
                handleFileChange={handleFileChange}
                name="passport"
            />
            <DropZone 
                title="PAN Card"
                handleFileChange={handleFileChange}
                name="pan_card"
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

export default EmployeeDocumentsForm;
