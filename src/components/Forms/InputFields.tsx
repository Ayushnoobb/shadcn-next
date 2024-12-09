import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: [];
  labelClassName?: string;
  containerClassName?: string;
  helperText?: string;
  labelPosition?: "top" | "left";
  required? : boolean , 
  name : string
  type?:
  | "textarea"
  | "text"
  | "file"
  | "email"
  | "tel"
  | "password"
  | "number"
  | "search"
  | "color"
  | "date"
  | "time"
  | "range"
  | "datetime-local"
  | "checkbox";
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      name ,
      className,
      labelClassName,
      containerClassName,
      helperText,
      labelPosition = "top",
      id,
      type = "text" , 
      required = false ,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn(
        "w-full",
        labelPosition === "left" && "grid grid-cols-4 gap-4 items-center",
        containerClassName
      )}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              labelPosition === "left" && "text-right",
              error && "text-destructive",
              labelClassName
            )}
          >
            {label}
            {required ? <span className="text-red-400"> *</span> : ""}
          </Label>
        )}
        <div className={cn(
          "flex flex-col gap-1.5",
          labelPosition === "left" && "col-span-3",
          labelPosition !== "left" && 'mt-2'
        )}>
          <Input
            id={inputId}
            ref={ref}
            name={name}
            type={type}
            className={cn(
              error && "border-destructive",
              className , 
              'py-[20px]'
            )}
            aria-describedby={
              error ? `${inputId}-error` : 
              helperText ? `${inputId}-helper` : 
              undefined
            }
            {...props}
          />
          {helperText && (
            <p
              id={`${inputId}-helper`}
              className="text-sm text-muted-foreground"
            >
              {helperText}
            </p>
          )}
          {error?.map((item: string, index: any) => (
            <span key={index} className="text-sm text-destructive">
              {item}
              <br></br>
            </span>
          ))}
          
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;