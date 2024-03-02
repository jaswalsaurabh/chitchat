import { getCurrentUser } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";

// @ts-ignore
Amplify.configure({ ...awsconfig });

const verifyAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const currentUser = await getCurrentUser();
          console.log("this is currentUser", currentUser);
        } catch (error) {
          router.push("/login");
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default verifyAuth;
