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
import GeneralInformation from "./MultiStepForm/GeneralInformation";
import EmployeeOnboardingForm from "./MultiStepForm/OnBoardingForm";
import EmployeeContractForm from "./MultiStepForm/EmployeeContract";
import EmployeeBenefitsForm from "./MultiStepForm/EmployeeBenefitsForm";
import EmployeeAddressForm from "./MultiStepForm/EmployeeAddressForm";
import EmployeeDocumentsForm from "./MultiStepForm/EmployeeDocumentForm";
import EmployeeExperienceForm from "./MultiStepForm/EmployeeExperienceForm";
import EmployeeEducationForm from "./MultiStepForm/EmployeeEducationForm";
import { Step } from "@/helpers/commonSchema/steps.schema";
import MultiStepForm from "@/components/Forms/MultiStep";

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
  isOpen,
  onOpenChange,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
    const renderContent  = (step : number , changeNext : () => void) : React.ReactNode => {
      switch(step){
        case 1 : 
          return <GeneralInformation changeNext={changeNext} />;
        case 2 : 
          return <EmployeeOnboardingForm changeNext={changeNext}/>
        case 3 : 
          return <EmployeeContractForm changeNext={changeNext}/>
        case 4 : 
          return <EmployeeBenefitsForm changeNext={changeNext}/>
        case 5 : 
          return <EmployeeAddressForm changeNext={changeNext}/>
        case 6 : 
          return <EmployeeDocumentsForm changeNext={changeNext}/>
        case 7 : 
          return <EmployeeExperienceForm changeNext={changeNext}/>
        case 8 : 
          return <EmployeeEducationForm changeNext={changeNext}/>
      }
    }

    const steps: Step[] = [
      { number: 1, label: "Information" },
      { number: 2, label: "Onboard" },
      { number: 3, label: "Contract" },
      { number: 4, label: "Benefits" },
      { number: 5, label: "Address" },
      { number: 6, label: "Documents" },
      { number: 7, label: "Experience" },
      { number: 8, label: "Education" },
      { number: 9, label: "Medical" },
      { number: 10, label: "Family" },
    ];


    useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      }
    }, [initialData]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[50vw] w-full max-h-full overflow-y-auto custom-scrollbar min-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Employee" : "Edit Employee"}</DialogTitle>
        </DialogHeader>
          <MultiStepForm steps={steps} renderContent={renderContent}/>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesActionModal;
