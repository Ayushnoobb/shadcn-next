import React, { FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    CardContent,
    Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label, RadioGroup } from '@radix-ui/react-dropdown-menu';
import SelectField from '@/components/Forms/SelectField';

const AccountForm = () => {
  const [urls, setUrls] = React.useState([
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' }
  ]);

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
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
                   
            </div>
           

          

          <Button type="submit">Update preferences</Button>
        </form>
    </div>
  );
};

export default AccountForm;