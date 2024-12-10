import React, { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelStyle?: string;
  labelWidth?: string;
  name: string;
  labelClassName?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  value?: string | number | boolean;
  required?: boolean;
  wrapperClassName?: string;
  options: { value: string | number; label: string }[];
  fieldErrors?: Array<string>;
  clearSelectValue?: boolean;
  setClearSelectValue?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  className = "",
  id,
  label,
  labelStyle,
  name,
  defaultValue,
  value,
  placeholder = `Select ${label}`,
  required,
  options,
  wrapperClassName = "",
  fieldErrors = [],
  clearSelectValue = false,
  setClearSelectValue,
  isDisabled,
  onChange,
  labelClassName
}) => {
  const selectRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (clearSelectValue === true) {
      onChange?.("");
      setClearSelectValue?.(false);
    }
  }, [clearSelectValue, setClearSelectValue, onChange]);

  const wrapperClasses = cn(
    wrapperClassName,
    labelStyle === "label-left" && "flex justify-between items-center gap-2"
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <Label 
          htmlFor={id ?? name} 
          className={cn(labelClassName)}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className={cn(
        "w-full",
        labelStyle !== "label-left" && "mt-2"
      )}>
        <Select
          defaultValue={defaultValue?.toString()}
          value={value?.toString()}
          onValueChange={onChange}
          disabled={isDisabled}
        >
          <SelectTrigger 
            ref={selectRef}
            className={cn(
              "w-full font-normal",
              className
            )}
            id={id ?? name}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value.toString()}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {fieldErrors.map((error, index) => (
          <span 
            key={index} 
            className="block text-destructive text-xs mt-1"
          >
            {error}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectField;