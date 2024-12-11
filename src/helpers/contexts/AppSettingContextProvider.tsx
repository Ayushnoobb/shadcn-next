"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { idpFetcher } from "../fetch.helper";
import { idpAccessToken } from "../token.helper";
import { useToast } from "@/hooks/use-toast";

interface SettingsContextProps {
  calendar?: string | null;
  setCalendar: (calendar: string) => void;
  updateCalendar: (calendar: string) => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsContext = createContext<SettingsContextProps>({
  calendar: null,
  setCalendar: () => {},
  updateCalendar: (calendar: string) => {},
});

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  
    const { toast } = useToast()
  const [calendar, setCalendar] = useState("nepali");
  const settingsURL = `${process.env.IDP_HOST}/api/setting-user/show`;
  const { data, isLoading } = useSWR(null, idpFetcher); //settingsURL

  // useEffect(() => {
  //   setCalendar(data?.data);
  // }, [data]);

  async function updateCalendar(calendar: string) {
    const formData = new FormData();
    formData.append("calendar", calendar ? calendar : "english");

    const updateSettingsURL = `${process.env.IDP_HOST}/api/setting-user/update`;
    try {
      const response = await fetch(updateSettingsURL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${idpAccessToken()}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setCalendar(calendar);
      if (data?.success) {
        toast({
            variant : 'success' ,
            title: `Successfully Updated`,
            description: data?.message,
          }); 
        return data;
      }
    } catch (err : any) {
        toast({
            variant : 'destructive' ,
            title: `Unable to Update`,
            description: err?.message,
          }); 
    }
  }

  return (
    <SettingsContext.Provider value={{ calendar, setCalendar, updateCalendar }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
