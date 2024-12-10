import React, { useState, FormEvent } from "react";
import FormSection from "@/components/elements/FormSection";
import SelectField from "@/components/Forms/SelectField";
import FormInput from "@/components/Forms/InputFields";
import { useToast } from "@/hooks/use-toast";
import { hrmsAccessToken } from "@/helpers/token.helper";

const EmployeeOnboardingForm = ({
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

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/onboarding/store`;
      const res = await fetch(submitURL, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${hrmsAccessToken()}`,
          Accept: "application/json",
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
    <FormSection title="Employee Onboarding">
      <form onSubmit={handleFormSubmit}>
        {/* Onboarding Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormInput
            label="Employee Name"
            id="employee_name"
            name="employee_name"
            required
            value={formData.employee_name}
            onChange={handleInputChange}
            error={error?.employee_name}
          />
          <FormInput
            label="Shortlisted At"
            id="shortlisted_at"
            name="shortlisted_at"
            type="date"
            value={formData.shortlisted_at}
            onChange={handleInputChange}
            error={error?.shortlisted_at}
          />
          <FormInput
            label="Interviewed At"
            id="interviewed_at"
            name="interviewed_at"
            type="date"
            value={formData.interviewed_at}
            onChange={handleInputChange}
            error={error?.interviewed_at}
          />
          <FormInput
            label="Offered At"
            id="offered_at"
            name="offered_at"
            type="date"
            value={formData.offered_at}
            onChange={handleInputChange}
            error={error?.offered_at}
          />
          <SelectField
            label="Employee Type"
            id="employee_type"
            name="employee_type"
            options={[
              { value: "permanent", label: "Permanent" },
              { value: "contract", label: "Contract" },
              { value: "intern", label: "Intern" },
            ]}
            value={formData.employee_type}
            onChange={(e: any) => handleSelectChange("employee_type", e.value)}
            fieldErrors={error?.employee_type}
          />
        </div>

        {/* Contract Details */}
        {/* <FormSection title="Contract Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <SelectField
              label="Contract Type"
              id="contract_type"
              name="contract_type"
              options={[
                { value: "full_time", label: "Full-Time" },
                { value: "part_time", label: "Part-Time" },
                { value: "freelance", label: "Freelance" },
              ]}
              value={formData.contract_type}
              onChange={(e: any) => handleSelectChange("contract_type", e.value)}
              fieldErrors={error?.contract_type}
            />
            <FormInput
              label="Job Description"
              id="job_description"
              name="job_description"
              value={formData.job_description}
              onChange={handleInputChange}
              error={error?.job_description}
            />
            <FormInput
              label="Gross Salary"
              id="gross_salary"
              name="gross_salary"
              type="number"
              value={formData.gross_salary}
              onChange={handleInputChange}
              error={error?.gross_salary}
            />
            <FormInput
              label="Basic Salary"
              id="basic_salary"
              name="basic_salary"
              type="number"
              value={formData.basic_salary}
              onChange={handleInputChange}
              error={error?.basic_salary}
            />
            <FormInput
              label="Provident Fund (Employee)"
              id="pf_from_employee"
              name="pf_from_employee"
              type="number"
              value={formData.pf_from_employee}
              onChange={handleInputChange}
              error={error?.pf_from_employee}
            />
            <FormInput
              label="Provident Fund (Company)"
              id="pf_from_company"
              name="pf_from_company"
              type="number"
              value={formData.pf_from_company}
              onChange={handleInputChange}
              error={error?.pf_from_company}
            />
          </div>
        </FormSection> */}

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

export default EmployeeOnboardingForm;
