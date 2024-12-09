import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { hrmsAccessToken } from "@/helpers/token.helper";
import { useToast } from "@/hooks/use-toast";
import React, { FormEvent, useEffect, useState } from "react";
import FormInput from "@/components/Forms/InputFields";
import Loader from "@/components/elements/Loader";
import ProfileImageUpload from "./EmployeeProfile";
import SelectField from "@/components/Forms/SelectField";

interface EmployeesActionModalProps {
  mode: "add" | "edit";
  initialData?: any;
  buttonClassName?: string;
  mutate: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeesActionModal: React.FC<EmployeesActionModalProps> = ({
  mode,
  initialData,
  buttonClassName,
  mutate,
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (key : string , value : string): void => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData(e.currentTarget);
    try {
      const submitURL = `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/employee/${
        mode == "edit" ? `update/${initialData?.id}` : `store`
      }`;
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
        mutate();
        toast({
          title: `Successfully ${mode == "edit" ? "Updated!" : "Created!"}`,
          description: data?.message,
        });
        onOpenChange(false);
      } else {
        setError(data?.error);
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

  const handleCancel = () => {
    onOpenChange(false);
    setError({});
    setFormData(initialData || {});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[50vw] w-full">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Employee" : "Edit Employee"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <ProfileImageUpload />
          </div>
          <div className="grid gap-4 mt-6 grid-cols-2 gap-6">
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
              onChange={(e) => handleSelectChange('gender',e.value)}
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
              onChange={(e) => handleSelectChange('marital_status',e.value)}
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
              onChange={(e) => handleSelectChange('blood_group',e.value)}
              fieldErrors={error?.blood_group}
            />
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit" disabled={isLoading}>
              {mode === "add" ? "Create Employee" : "Save Changes"}
              {isLoading && <Loader />}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesActionModal;
