import React, { useState, FormEvent } from "react";
import FormSection from "@/components/elements/FormSection";
import FormInput from "@/components/Forms/InputFields";
import { useToast } from "@/hooks/use-toast";
import { hrmsAccessToken } from "@/helpers/token.helper";

const EmployeeAddressForm = ({
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
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/address/store`;
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
    <FormSection title="Employee Address">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormInput
            label="Country"
            id="p_country"
            name="p_country"
            value={formData.p_country}
            onChange={handleInputChange}
            error={error?.p_country}
          />
          <FormInput
            label="State"
            id="p_state"
            name="p_state"
            value={formData.p_state}
            onChange={handleInputChange}
            error={error?.p_state}
          />
          <FormInput
            label="City"
            id="p_city"
            name="p_city"
            value={formData.p_city}
            onChange={handleInputChange}
            error={error?.p_city}
          />
          <FormInput
            label="Street"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            error={error?.street}
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

export default EmployeeAddressForm;
