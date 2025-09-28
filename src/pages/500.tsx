import { KEYNOTE_API } from "@/API/KEYNOTE/API";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const dev = process.env.NODE_ENV === "development";

const Er_500 = ({}: any) => {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        var res = await KEYNOTE_API.Client.ServerStatus.Status();


        if (res.status === "Ok") {
          setIsConnected(true);
          setTimeout(async () => {
            router?.push(router?.query?.redirect?.toString() || "/");
          }, 1000);
        }
      },
      dev ? 500 : 4000,
    );
    return () => clearInterval(interval);
  }, [router, router?.query]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-foreground">
      <div className="text-7xl font-bold">
        <Image loading="eager" src="/banner_dark.svg" width={438} height={164} className="object-contain" alt="logo" />{" "}
      </div>

      <h1 className="mt-4 text-3xl font-semibold lg:text-6xl">Oops, that's our bad</h1>

      <p className="mt-2 text-lg text-muted-foreground lg:text-4xl">Our systems are down</p>

      <p className="mt-2 text-sm text-muted-foreground">Page will automatically reload</p>
    </div>
  );
};

export default Er_500;
