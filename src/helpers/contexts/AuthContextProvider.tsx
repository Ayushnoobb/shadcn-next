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
  changeSelectedCompany: async () => {},
  loadingSelectedCompany: true,
  loading: true,
  fetchUser: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loadingSelectedCompany, setLoadingSelectedCompany] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const fetchUserAndCompany = async () => {
    const IDP_ACCESS_TOKEN = Cookies.get("IDP_ACCESS_TOKEN");
    if (!IDP_ACCESS_TOKEN) {
      router.replace(routes.ADMIN_LOGIN);
      return;
    }

    try {
      // Fetch user data
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_IDP_HOST}/api/get-user-by-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${IDP_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (!userResponse.ok) {
        Cookies.remove("IDP_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
        Cookies.remove("HRMS_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
        router.replace(routes.ADMIN_LOGIN);
        return;
      }

      const userData = await userResponse.json();
      setUser(userData.data);

      // Set companies and selected company
      if (userData.data.companies?.length > 0) {
        setCompanies(userData.data.companies);

        const selectedCompanyResponse = await fetch(`${process.env.NEXT_PUBLIC_HRMS_HOST}/api/selected-company`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${hrmsAccessToken()}`,
            Accept: "application/json",
          },
        });

        if (selectedCompanyResponse.ok) {
          const selectedData = await selectedCompanyResponse.json();
          const foundCompany = userData.data.companies.find(
            (company: Record<string, any>) => company.id == selectedData.data
          );
          setSelectedCompany(foundCompany || userData.data.companies[0]);
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      router.replace(routes.ADMIN_LOGIN);
    } finally {
      setLoading(false); // Only set loading to false on initial load
      setLoadingSelectedCompany(false);
    }
  };

  useEffect(() => {
    if (!user || !selectedCompany) {
      fetchUserAndCompany();
    }
  }, []);

  const changeSelectedCompany = async (company_id: string) => {
    setLoadingSelectedCompany(true);
    const HRMS_ACCESS_TOKEN = Cookies.get("HRMS_ACCESS_TOKEN");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HRMS_HOST}/api/select-company`, {
        method: "POST",
        body: JSON.stringify({ company_id }),
        headers: {
          Authorization: `Bearer ${HRMS_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedCompany = companies.find((company : any) => company?.id === Number(company_id));
        setSelectedCompany(updatedCompany || null);
        router.replace(routes.DASHBOARD_INDEX);
      } else {
        throw new Error("Failed to update company selection.");
      }
    } catch (error) {
      console.error("Error changing selected company:", error);
    } finally {
      setLoadingSelectedCompany(false);
    }
  };

  const logout = async () => {
    const IDP_ACCESS_TOKEN = Cookies.get("IDP_ACCESS_TOKEN");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_IDP_HOST}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${IDP_ACCESS_TOKEN}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("IDP_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
      Cookies.remove("HRMS_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
      setUser(null);
      router.push(routes.ADMIN_LOGIN);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: !user && loading, // Only show loader on initial load
        companies,
        selectedCompany,
        loadingSelectedCompany,
        changeSelectedCompany,
        fetchUser: fetchUserAndCompany,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
