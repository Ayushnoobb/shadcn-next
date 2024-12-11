import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

import React, { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { AdToBs, getTomorrowEnglishDate, getYesterdayEnglishDate } from "@/helpers/date.helper"
import { Label } from "../ui/label";

interface NepaliDateFieldProps {
  children?: React.ReactNode;
  wrapperClassName?: string;
  id?: string;
  className?: string;
  label?: string;
  labelStyle?: "label-left" | 'label-top';
  labelWidth?: String;
  name?: string;
  status?: string;
  disabled?: boolean;
  value?: any;
  defaultValue?: any;
  formGroup?: string;
  hasIcon?: string;
  size?: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
  required?: boolean;
  hidden?: boolean;
  fieldErrors?: Array<string>;
  helpText?: String;
  onChange?: (e: any) => void;
  step?: string;
  disableFutureDate?: boolean;
  position?: "bottom" | "left";
  disablePastDate?: boolean;
  isToday? : boolean
}

const NepaliDateField: React.FC<NepaliDateFieldProps> = ({
  className = "",
  id,
  wrapperClassName = "",
  children,
  label,
  labelStyle,
  labelWidth,
  name,
  status,
  disabled,
  value,
  defaultValue,
  formGroup,
  hasIcon,
  size,
  placeholder,
  rows,
  hint,
  required,
  fieldErrors = [],
  helpText,
  hidden = false,
  onChange,
  disableFutureDate,
  position = "bottom",
  disablePastDate,
  isToday  = false ,
  ...props
}) => {
  const today = new NepaliDate().format("YYYY-MM-DD");
  const tomorrow = getTomorrowEnglishDate();
  const previousDay = getYesterdayEnglishDate();
  const currentNepaliDate = new NepaliDate().format("YYYY-MM-DD");
  const tomorrowNepaliDate = AdToBs(tomorrow);
  const yesterdayNepaliDate = AdToBs(previousDay);

  useEffect(() => {
    if (disabled) {
      document.querySelector('._1oYOS')?.setAttribute('disabled', 'true');
    } else {
      document.querySelector('._1oYOS')?.removeAttribute('disabled');
    }
  }, [disabled]);

  return (
    <div
      className={`w-full flex-col ${wrapperClassName} ${
        position === "left" ? "inputLeft" : ""
      }`}
    >
      {label && (
        <Label id={id && id}>
          {label}
        </Label>
      )}
      <div className={label && 'w-full mt-2'}>
        <Calendar
          onChange={onChange}
          hideDefaultValue={defaultValue ? false : (isToday ? false : true)}
          defaultDate={defaultValue ?? (isToday ? today : undefined)}
          placeholder={"YYYY-MM-DD"}
          language={"en"}
          value={value ?? ''}
          className={`border rounded-md py-1.5 px-1.5 w-48 ${className} text-xs `}
          maxDate={disableFutureDate ? tomorrowNepaliDate : undefined}
          minDate={disablePastDate ? yesterdayNepaliDate : undefined}
          disabled={disabled}
        />
        {children}
        {helpText && (
          <div className="text-gray-800 text-xs mt-1">{helpText}</div>
        )}
        <span className="text-error-500 text-xs">
          {fieldErrors.map((item: string, index: any) => (
            <span key={index}>
              {item}
              <br></br>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default NepaliDateField;
