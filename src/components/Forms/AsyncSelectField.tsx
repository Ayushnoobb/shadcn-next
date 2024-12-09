import AsyncSelect from 'react-select/async';
import React, { useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { ChoiceType } from '@/helpers/commonSchema/common.schema';

interface SelectFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelStyle: string;
  labelWidth?: string;
  name: string;
  defaultValue?: string | number | boolean;
  value?: string | number | boolean;
  required?: boolean;
  wrapperClassName?: string;
  options?: { value: string | number; label: string }[];
  fieldErrors?: Array<string>;
  clearSelectValue?: boolean;
  setClearSelectValue?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled?: boolean;
  onChange?: (choice: ChoiceType | any) => void | any;
  loadOptions? :  (inputValue: string, callback: (options: any[]) => void) => Promise<void> | any
  placeHolder? : string
  labelClassName? : string
  defaultOptions? : { value: string | number; label: string }[]
  isMulti? : boolean
  getOptionLabel? :any
  isClearable?: boolean
}


const AsyncSelectField: React.FC<SelectFieldProps> = ({
  className = '',
  id,
  label,
  labelStyle,
  labelWidth,
  name,
  defaultValue,
  value,
  required,
  wrapperClassName = '',
  fieldErrors = [],
  clearSelectValue = false,
  setClearSelectValue,
  isDisabled,
  onChange,
  loadOptions,
  placeHolder,
  labelClassName ,
  defaultOptions ,
  isMulti = false ,
  getOptionLabel , 
  isClearable
}) => {
  if (labelStyle === 'label-left') {
    wrapperClassName = wrapperClassName.concat(
      ' ',
      ' flex justify-between items-center gap-4 '
    );
  }

  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (clearSelectValue) {
      selectRef?.current?.clearValue?.();
      setClearSelectValue && setClearSelectValue(false);
    }
  }, [clearSelectValue, setClearSelectValue]);



  const styles = {
    menuList: (base: any) => ({
      ...base,
      '::-webkit-scrollbar': {
        width: '5px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#d1d1d1',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
  };

  return (
    <div className={`${wrapperClassName}`}>
      {label && (
        <Label id={id ?? name} className={labelClassName}>
          {label}
          {required ? <span className="text-error-400"> *</span> : ''}
        </Label>
      )}
      <div className="w-full">
        <AsyncSelect
          cacheOptions
          isMulti={isMulti}
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          ref={selectRef}
          styles={styles}
          isDisabled={isDisabled}
          onChange={onChange}
          className={className}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          getOptionLabel={getOptionLabel}
          isClearable={isClearable}
        />
        <span className="block text-error-500 text-xs my-1">
          {fieldErrors.map((item: string, index: any) => (
            <span key={index}>{item}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default AsyncSelectField;
