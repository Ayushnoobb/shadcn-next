import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState, useEffect } from "react"

import FormInput from "@/components/Forms/InputFields"
import SelectField from "@/components/Forms/SelectField"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Filter, FilterX } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-localStorage"

const EmployeeCustomFilter: React.FC<{ mutate: () => void }> = ({
    mutate,
  }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
  
    const [storedFilterData, setStoredFilterData, removeStoredFilterData] = useLocalStorage<Record<string, any>>(
      'employeeFilter',
    );

  
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<Record<string, any>>(storedFilterData || {});
    const [isLoading, setLoading] = useState<boolean>(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      const updatedFormData = {
        ...formData,
        [name]: value,
      };
      setFormData(updatedFormData);
      setStoredFilterData(updatedFormData); // Persist filter to localStorage
    };
  
    const handleSelectChange = (key: string, value: string): void => {
      const updatedFormData = {
        ...formData,
        [key]: value,
      };
      setFormData(updatedFormData);
      setStoredFilterData(updatedFormData); // Persist filter to localStorage
    };
  
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const currentParams = new URLSearchParams(searchParams.toString());
  
      // Clear existing non-pagination params
      Array.from(currentParams.keys()).forEach((key) => {
        if (key !== 'page' && key !== 'page_size') {
          currentParams.delete(key);
        }
      });
  
      // Add new filter params
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, String(value));
        }
      });
  
      router.replace(`?${currentParams.toString()}`);
      mutate?.();
      setIsOpen(false);
    };
  
    const handleClearFilter = () => {
      // Clear `localStorage` and form data
      removeStoredFilterData('employeeFilter');
      setFormData({});
  
      // Reset URL params (keep page and page_size if they exist)
      const currentParams = new URLSearchParams(searchParams.toString());
      const page = currentParams.get('page');
      const pageSize = currentParams.get('page_size');
  
      currentParams.forEach((value, key) => {
        if (key !== 'page' && key !== 'page_size') {
          currentParams.delete(key);
        }
      });
  
      if (page) currentParams.set('page', page);
      if (pageSize) currentParams.set('page_size', pageSize);
  
      router.replace(currentParams.toString() ? `?${currentParams.toString()}` : pathname);
      mutate?.();
    };
  
    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
              currentParams.set(key, String(value));
            }
          });
        router.replace(`?${currentParams.toString()}`);
        mutate?.();
        
    }, [storedFilterData]);
    
  
    const shouldShowClearFilter =
      (((searchParams?.get('page') || searchParams?.get('page_size')) && searchParams.size > 1) ||
        (!searchParams?.get('page') && !searchParams?.get('page_size') && searchParams.size > 0));
  
    return (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Filter />
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-[50vw] w-full max-h-full overflow-y-auto custom-scrollbar">
            <DialogHeader>
              <DialogTitle className="font-semibold">Filter Employee</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit}>
                <div className="grid mt-6 grid-cols-1 md:grid-cols-2 md:gap-6 gap-2">
                    <FormInput
                    label="Name"
                    name="name"
                    id="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    />
                    <FormInput
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                    />
                    <FormInput
                        label="Mobile"
                        id="mobile"
                        type="number"
                        name="mobile"
                        value={formData.mobile || ''}
                        onChange={handleInputChange}
                        placeholder="Enter mobile"
                    />
                    <FormInput
                        label="Address"
                        id="address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
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
                        onChange={(e: any) => handleSelectChange('gender', e.value)}
                    />
                    <FormInput
                        label="Date of Birth"
                        id="dob"
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth || ''}
                        onChange={handleInputChange}
                    />
                    <SelectField
                        label="Marital Status"
                        id="marital_status"
                        name="marital_status"
                        options={[
                            { value: "single", label: "Single" },
                            { value: "married", label: "Married" },
                        ]}
                        value={formData.marital_status}
                        onChange={(e: any) => handleSelectChange('marital_status', e.value)}
                    />
                    <FormInput
                        label="Religion"
                        id="religion"
                        name="religion"
                        value={formData.religion || ''}
                        onChange={handleInputChange}
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
                        onChange={(e: any) => handleSelectChange('blood_group', e.value)}
                    />
                </div>
              <DialogFooter className="mt-6">
                <Button type="submit" disabled={isLoading}>
                  Filter
                </Button>
                <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {shouldShowClearFilter && (
          <button
            className="text-sm bg-background p-2 shadow-sm border rounded flex items-center gap-2 text-gray-600 font-medium cursor-pointer min-w-fit"
            onClick={handleClearFilter}
          >
            <FilterX className="h-4" /> Clear Filter
          </button>
        )}
      </>
    );
  };
  
  export default EmployeeCustomFilter;
  
