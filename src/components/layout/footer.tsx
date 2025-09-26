import Link from "next/link";
import { useRouter } from "next/router";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="flex w-screen flex-col items-center justify-center border-t border-border bg-background text-foreground">
      <div
        className="relative flex w-full flex-col items-center justify-center pt-8 pb-20"
        style={{ maxWidth: router.asPath.startsWith("/admin") ? 1600 : 1200 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-4">Keynote</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
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

          <div className="mx-2 h-10 bg-foreground sm:w-px" />

          <div className="flex">
            <Link aria-label="Go to pharma for you facebook" className="mx-2 text-3xl" href={"https://www.linkedin.com/in/ilia-nozdrachev/"}>
              <FaLinkedin />
            </Link>
            <Link aria-label="Go to pharma for you instagram" className="mx-2 text-3xl" href={"https://github.com/nozsavsev"}>
              <FiGithub />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex opacity-70">© 2024 Keynote. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
