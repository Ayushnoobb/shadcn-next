"use client";


import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/helpers/contexts/AuthContextProvider";
import { routes } from "./routes";
import Loader from "@/components/elements/Loader";



const isAuthenticated = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { loading, user } = useContext(AuthContext);

    useEffect(() => {
      if (!loading && !user) {
        router.push(routes.ADMIN_LOGIN);
      }
    }, [user, loading, router]);

    if (loading) return (
    <div className="fixed w-full h-full flex justify-center items-center bg-white">
      <Loader />
    </div>
  );
    return user ? <WrappedComponent {...props} /> : null;
  };
  
  return Wrapper;
};

export default isAuthenticated;