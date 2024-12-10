import React, { useState, FormEvent } from "react";
import FormSection from "@/components/elements/FormSection";
import FormInput from "@/components/Forms/InputFields";
import { useToast } from "@/hooks/use-toast";
import { hrmsAccessToken } from "@/helpers/token.helper";

const EmployeeBenefitsForm = ({
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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/benefits/store`;
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
    <FormSection title="Employee Benefits">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormInput
            label="PAN"
            id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            error={error?.pan}
          />
          <FormInput
            label="SSF"
            id="ssf"
            name="ssf"
            type="number"
            value={formData.ssf}
            onChange={handleInputChange}
            error={error?.ssf}
          />
          <FormInput
            label="CIT"
            id="cit"
            name="cit"
            type="number"
            value={formData.cit}
            onChange={handleInputChange}
            error={error?.cit}
          />
          <FormInput
            label="PF"
            id="pf"
            name="pf"
            type="number"
            value={formData.pf}
            onChange={handleInputChange}
            error={error?.pf}
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

export default EmployeeBenefitsForm;
