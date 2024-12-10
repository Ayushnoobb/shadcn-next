"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Stepper from "@/components/ui/stepper";
import { Step } from "@/helpers/commonSchema/steps.schema";



export default function MultiStepForm({steps , renderContent} : 
    {steps : Step[] , renderContent : ( step : number , changeNext : () => void ) => React.ReactNode}
) {
  
    const [currentStep, setCurrentStep] = React.useState(1);

    const handleNext = () => {
        if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
        }
    };

    const handleStepClick = (stepNumber: number) => {
        setCurrentStep(stepNumber);
    };

    return (
        <div className="max-w-[40vw] mx-auto">
            <div className=" p-4 space-y-6">
                <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
                />
                <div>
                    {
                        renderContent(currentStep , handleNext)
                    }
                </div>
        </div>
        </div>
    );
}