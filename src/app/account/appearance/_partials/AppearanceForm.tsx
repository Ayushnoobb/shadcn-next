import React, { FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import SelectField from '@/components/Forms/SelectField';

const AppearanceForm = () => {
  const [theme, setTheme] = React.useState("light");
  const [font, setFont] = React.useState("inter");

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <Label>Font</Label>
                <p className='mb-2 text-xs'>
                    Set the font you want to use in the dashboard.
                </p>
                <SelectField 
                    name='font'
                    options={
                        [
                            {label : 'Inter' , value : 'inter'},
                            {label : 'Manrope' , value : 'manrope'},
                            {label : 'System' , value : 'system'},
                        ]
                    }
                />
            </div>
            <div>

                <Label>Theme</Label>
                    <p className='mb-2 text-xs'>
                        Select the theme for the dashboard.
                    </p>
                    <RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className="grid max-w-md grid-cols-2 gap-8 pt-2"
                    >
                    <div>
                        <Label className="[&:has([data-state=checked])>div]:border-primary">
                        {/* <FormControl>
                        </FormControl> */}
                            <RadioGroupItem value="light" className="sr-only" />
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                            Light
                        </span>
                        </Label>
                    </div>
                    <div>
                        <Label className="[&:has([data-state=checked])>div]:border-primary">
                        {/* <FormControl>
                        </FormControl> */}
                            <RadioGroupItem value="dark" className="sr-only" />
                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                            Dark
                        </span>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
           

          

          <Button type="submit">Update preferences</Button>
        </form>
    </div>
  );
};

export default AppearanceForm;