import { useRouter } from "next/router";
// import UserMenu from "./auth/UserMenu";
import useNauthUser from "@/hooks/nauth/useNauthUser";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "../auth/UserMenu";
import SideMenu from "./SideMenu";

const Navbar = ({ sticky = true }: { sticky?: boolean }) => {
  const router = useRouter();

  const { user } = useNauthUser();

  return (
    <>
      <div className="z-50 m-0 hidden w-full items-center justify-center bg-background border-b-2 border-border md:flex">
        <div className="flex h-18 w-10/12 max-w-screen-xl items-center justify-between">
          <Link
            aria-label="Go home"
            href={router.asPath.startsWith("/admin") ? "/admin" : "/"}
            onDoubleClick={
              router.asPath.startsWith("/admin")
                ? () => {
                    router.push("/");
                  }
                : undefined
            }
            className="flex shrink-0 cursor-pointer items-center justify-center overflow-hidden bg-transparent"
          >
            <Image src="/banner_dark.svg" alt="logo" width={150} height={56} className="h-15 w-auto" />
          </Link>

          <div id="navbar-search-portal" className="h-full w-full" />

          <UserMenu />
        </div>
      </div>

      <div className={`top-0 z-50 m-0 box-border flex h-16 w-full items-center justify-center bg-background py-3 shadow-md md:hidden`}>
        <div className={`flex w-11/12 items-center justify-between`} style={{ maxWidth: router.asPath.startsWith("/admin") ? 1600 : 1200 }}>
          <SideMenu />
          <Link href={"/"}>
            <Image src="/banner_dark.svg" alt="logo" width={438} height={164} className="h-10 w-auto" />
          </Link>
          <div className="w-12" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
