import AsyncSelect from 'react-select/async';
import React, { useEffect, useRef } from 'react';
import { ChoiceType } from '@/helpers/commonSchema/common.schema';
import { Label } from '../ui/label';
import { StylesConfig } from 'node_modules/react-select/dist/declarations/src';

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
  onChange?: (choice: ChoiceType) => void | any;
  loadOptions? :  (inputValue: string, callback: (options: any[]) => void) => Promise<void> | any
  placeHolder? : string
  labelClassName? : string
  defaultOptions? : { value: string | number; label: string }[]
  isMulti? : boolean
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

  // useEffect(() => {
  //   // Auto-select the first option if available
  //   if (!selectedValue && defaultOptions && defaultOptions.length > 0) {
  //     const firstOption = defaultOptions[0];
  //     setSelectedValue(firstOption);
  //     onChange && onChange(firstOption);
  //   }
  // }, [defaultOptions, selectedValue, onChange]);

  const styles = {
    menuList: (base: any , state  :any) => ({
      ...base,
      borderColor : state?.isFocused && 'bg-[var(--primary)]',
      colourStyles : '#fff',
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
    input: (base:any, state : any) => ({
      ...base,
      '[type="text"]': {
        fontSize: 13,
        fontWeight: 900,
        color: 'green'
      }
    })
  };

  const colourStyles: StylesConfig<any> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor:'hsl(var(--background))',
        color:'#fff'
      };
    },
    
    // input: (styles) => ({ ...styles, ...dot() }),
    // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };  

  return (
    <div className={`${wrapperClassName}`}>
      {label && (
        <Label id={id ?? name}  className={labelClassName}>
          {label}
          {required ? <span className="text-error-400"> *</span> : ''}
        </Label>
      )}
      <div className="w-full mt-2">
        <AsyncSelect
          cacheOptions
          isMulti={isMulti}
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          ref={selectRef}
          styles={styles}
          isDisabled={isDisabled}
          onChange={onChange}
          className={className + 'bg-[var(--primary)]' + ' !text-sm'}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              backgroundColor: 'hsl(var(--background))' ,
              primary25: 'hsl(var(--secondary))',
              primary: 'hsl(var(--secondary))',
              color : '#fff'
            },
          })}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          isDiabled={isDisabled}

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
