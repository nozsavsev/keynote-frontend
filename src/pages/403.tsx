import { NAUTH_API } from "@/API/NAUTH/API";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { FaUserShield } from "react-icons/fa";

const Er_403 = ({}: any) => {
  const router = useRouter();

  return (
    <div className="text-foreground flex h-screen w-full flex-col items-center justify-center">
      <div className="text-destructive text-7xl font-bold">
        <FaUserShield className="h-16 w-16" />
      </div>
      <h1 className="mt-4 text-3xl font-semibold">Access Denied</h1>
      <p className="text-muted-foreground mt-2 text-lg">You do not have permission to view this page.</p>
      <div className="mt-6 flex space-x-4">
        <Button onClick={() => router.back()}>Back</Button>
        <Button asChild>
          <a
            href="/auth/login"
            onClick={async (e) => {
              //@ts-ignore
              window.noLogoutRedirect = true;
              await NAUTH_API.Client.Session.Revoke({});
            }}
          >
            Relogin
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Er_403;
