"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { hrmsAccessToken } from "../token.helper";

interface AuthContextProps {
  user: User | null;
  companies: Array<string | number>;
  selectedCompany: Record<string, any> | null;
  loadingSelectedCompany: Boolean;
  changeSelectedCompany: (company_id: string) => Promise<void>;
  loading: boolean;
  fetchUser: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  companies: [],
  selectedCompany: null,
  changeSelectedCompany: async() => {},
  loadingSelectedCompany: true,
  loading: true,
  fetchUser: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState([]);
  const [companyID, setCompanyID] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loadingSelectedCompany, setLoadingSelectedCompany] =
    useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const changeSelectedCompany = async (company_id: string) => {
    setLoadingSelectedCompany(true);
    const HRMS_ACCESS_TOKEN = Cookies.get("HRMS_ACCESS_TOKEN");

    const formData = new FormData();
    formData.append("company_id", company_id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HRMS_HOST}/api/select-company`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${HRMS_ACCESS_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        let companiess = [...companies];
        let company = companiess.filter((company) => {
          return company.id === Number(company_id);
        });
        setSelectedCompany(company[0]);
        console.log('completed')
        router.replace(routes.DASHBOARD_INDEX)
      } else if (response.status === 401) {
        // Cookies.remove("IDP_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
        // Cookies.remove("TMS_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
        setUser(null);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
    } finally {
      // setLoadingSelectedCompany(false);
    }
  };

  const fetchUser = async (token: string) => {
    setLoadingSelectedCompany(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IDP_HOST}/api/get-user-by-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUser(result.data);
        // set companies
        if (result.data.companies !== undefined) {
          setCompanies(result.data.companies);
          setSelectedCompany(result.data.companies[0]);
        }
      } else if (response.status === 401) {
        Cookies.remove("IDP_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
        Cookies.remove("HRMS_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
        setUser(null);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
    } finally {
      setLoading(false);
      // setLoadingSelectedCompany(false);
    }
  };

  useEffect(() => {
    setLoadingSelectedCompany(true);

    const IDP_ACCESS_TOKEN = Cookies.get("IDP_ACCESS_TOKEN");
    fetch(`${process.env.NEXT_PUBLIC_IDP_HOST}/api/get-user-by-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${IDP_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          Cookies.remove("IDP_ACCESS_TOKEN", {
            domain: process.env.APP_DOMAIN,
          });
          Cookies.remove("HRMS_ACCESS_TOKEN", {
            domain: process.env.APP_DOMAIN,
          });
          setUser(null);
        }
        return response.json();
      })
      .then((result) => {
        if (result.success === true) {
          setUser(result.data);
          console.log(result?.data)
          if (result.data.companies !== undefined) {
            setCompanies(result.data.companies);

            fetch(`${process.env.NEXT_PUBLIC_HRMS_HOST}/api/selected-company`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${hrmsAccessToken()}`,
                Accept: "application/json",
              },
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
              })
              .then((selectedResult) => {
                if (selectedResult.success) {
                  const companiess = result.data.companies;
                  const selectedCompany = companiess.find(
                    (company: Record<string, any>) =>
                      company.id == selectedResult.data
                  );
                  setSelectedCompany(selectedCompany);
                } else {
                }
              })
              .catch((error) => {
              })
              .finally(() => {
                setLoadingSelectedCompany(false);
              });
            // -----------------
          }
        }
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if(!loadingSelectedCompany && selectedCompany == null){
      console.log('replaced')
      router.replace(routes.SELECT_COMPANY_INDEX)
    }
  },[loadingSelectedCompany])


  // logout method
  const logout = async () => {
    const IDP_ACCESS_TOKEN = Cookies.get("IDP_ACCESS_TOKEN");
    const refresh = Cookies.get("HRMS_ACCESS_TOKEN");
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${IDP_ACCESS_TOKEN}`,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IDP_HOST}/api/logout`,
        options
      );
      const jsonResponse = await response.json();

      Cookies.remove("IDP_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
      Cookies.remove("HRMS_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });

      setUser(null);
      router.push(routes.ADMIN_LOGIN);
    } catch (error) {
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        companies,
        selectedCompany,
        loadingSelectedCompany,
        changeSelectedCompany,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
