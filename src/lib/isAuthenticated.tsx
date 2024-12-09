"use client";


import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/helpers/contexts/AuthContextProvider";
import { routes } from "./routes";
import Loader from "@/components/elements/Loader";

interface WrapperProps {
  // If your WrappedComponent has any specific props, you can add them here
}

const isAuthenticated = <P extends WrapperProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { loading, user } = useContext(AuthContext);

    useEffect(() => {
      if (loading) {
        // Optional: You might want to handle the loading state differently
        return;
      }

      if (!user) {
        // router.push(routes.ADMIN_LOGIN);
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="fixed w-full h-full flex justify-center items-center bg-white">
          <Loader />
        </div>
      );
    }

    return user ? <WrappedComponent {...props} /> : null; // Returning null when not authenticated
  };

  return Wrapper;
};

export default isAuthenticated;