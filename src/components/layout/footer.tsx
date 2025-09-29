import Link from "next/link";
import { useRouter } from "next/router";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="border-border bg-background text-foreground flex w-screen flex-col items-center justify-center border-t">
      <div
        className="relative flex w-full flex-col items-center justify-center pt-8 pb-20"
        style={{ maxWidth: router.asPath.startsWith("/admin") ? 1600 : 1200 }}
      >
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl font-bold">Keynote</h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            The future of presentations is here. Upload, present, and engage like never before.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-lg opacity-50 sm:flex-row">
          <div className="flex">
            <Link className="mx-2" href={"/"}>
              {"Home"}
            </Link>
            <Link className="mx-2" href={"/legal"}>
              {"Privacy Policy"}
            </Link>
            <Link className="mx-2" href={"/legal"}>
              {"Terms of Service"}
            </Link>
          </div>

          <div className="bg-foreground mx-2 h-10 sm:w-px" />

          <div className="flex">
            <Link aria-label="LinkedIn Profile" className="mx-2 text-3xl" href={"https://www.linkedin.com/in/ilia-nozdrachev/"}>
              <FaLinkedin />
            </Link>
            <Link aria-label="GitHub Profile" className="mx-2 text-3xl" href={"https://github.com/nozsavsev"}>
              <FiGithub />
            </Link>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 text-sm opacity-70 sm:flex-row">
            <span>Open Source:</span>
            <Link className="hover:text-primary transition-colors" href={"https://github.com/nozsavsev/nauth-asp"}>
              Backend (ASP.NET Core)
            </Link>
            <span>•</span>
            <Link className="hover:text-primary transition-colors" href={"https://github.com/nozsavsev/nauth-frontend"}>
              Frontend (Next.js)
            </Link>
          </div>
        </div>

        <div className="mt-4 flex opacity-70">© 2024 Keynote. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
