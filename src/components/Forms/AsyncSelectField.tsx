import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChoiceType } from "@/helpers/commonSchema/common.schema";

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
  onChange?: (choice: ChoiceType | any) => void;
  loadOptions?: (inputValue: string, callback: (options: any[]) => void) => Promise<void>;
  placeHolder?: string;
  labelClassName?: string;
  defaultOptions?: { value: string | number; label: string }[];
  isMulti?: boolean;
  getOptionLabel?: (option: any) => string;
  isClearable?: boolean;
}

const AsyncSelectField: React.FC<SelectFieldProps> = ({
  className = "",
  id,
  label,
  labelStyle,
  name,
  defaultValue,
  value,
  required,
  wrapperClassName = "",
  fieldErrors = [],
  clearSelectValue = false,
  setClearSelectValue,
  isDisabled,
  onChange,
  loadOptions,
  placeHolder,
  labelClassName,
  defaultOptions = [],
  isMulti = false,
  getOptionLabel,
  isClearable = true,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const selectRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (clearSelectValue) {
      setSelectedItems([]);
      setClearSelectValue?.(false);
    }
  }, [clearSelectValue, setClearSelectValue]);

  useEffect(() => {
    const loadInitialOptions = async () => {
      if (loadOptions && defaultOptions.length === 0) {
        setLoading(true);
        await loadOptions("", (loadedOptions) => {
          setOptions(loadedOptions);
        });
        setLoading(false);
      }
    };
    loadInitialOptions();
  }, [loadOptions, defaultOptions]);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    if (loadOptions) {
      setLoading(true);
      await loadOptions(value, (loadedOptions) => {
        setOptions(loadedOptions);
      });
      setLoading(false);
    }
  };

  const handleSelect = (item: any) => {
    let newSelectedItems;
    if (isMulti) {
      if (selectedItems.some((i) => i.value === item.value)) {
        newSelectedItems = selectedItems.filter((i) => i.value !== item.value);
      } else {
        newSelectedItems = [...selectedItems, item];
      }
      setSelectedItems(newSelectedItems);
    } else {
      newSelectedItems = [item];
      setSelectedItems(newSelectedItems);
      setOpen(false);
    }
    onChange?.(isMulti ? newSelectedItems : newSelectedItems[0]);
  };

  const removeItem = (itemToRemove: any) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.value !== itemToRemove.value
    );
    setSelectedItems(newSelectedItems);
    onChange?.(isMulti ? newSelectedItems : null);
  };

  const wrapperClasses = cn(
    wrapperClassName,
    labelStyle === "label-left" && "flex justify-between items-center gap-4"
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <Label htmlFor={id ?? name} className={labelClassName}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={selectRef}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                !selectedItems.length && "text-muted-foreground",
                className
              )}
              disabled={isDisabled}
            >
              <div className="flex gap-1 flex-wrap">
                {selectedItems.length > 0 ? (
                  isMulti ? (
                    selectedItems.map((item) => (
                      <Badge
                        variant="secondary"
                        key={item.value}
                        className="mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item);
                        }}
                      >
                        {getOptionLabel ? getOptionLabel(item) : item.label}
                        {isClearable && (
                          <X className="ml-1 h-3 w-3 hover:text-destructive" />
                        )}
                      </Badge>
                    ))
                  ) : (
                    getOptionLabel
                      ? getOptionLabel(selectedItems[0])
                      : selectedItems[0].label
                  )
                ) : (
                  placeHolder || "Select..."
                )}
              </div>
              {loading ? (
                <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search..."
                value={searchQuery}
                onValueChange={handleSearch}
              />
              <CommandEmpty>No options found</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedItems.some((item) => item.value === option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {getOptionLabel ? getOptionLabel(option) : option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {fieldErrors.map((error, index) => (
          <span key={index} className="block text-destructive text-xs mt-1">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AsyncSelectField;