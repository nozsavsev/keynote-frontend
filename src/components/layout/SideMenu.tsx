import { NAUTH_API } from "@/API/NAUTH/API";
import useNauthUser from "@/hooks/nauth/useNauthUser";
import { isAnyAdmin } from "@/lib/isAnyAdmin";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { BiHome, BiLogOut } from "react-icons/bi";
import { FiShield, FiUser } from "react-icons/fi";

export default function SideMeny({}: {}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const { user } = useNauthUser();

  const router = useRouter();

  return (
    <>
      <button type="button" onClick={openModal} className={`mx-1 rounded-md`}>
        <Image
          loading="lazy"
          alt="user avatar"
          src={user?.avatarURL! || "https://nauth-avatars.s3.eu-north-1.amazonaws.com/avatar/default.png"}
          width={40}
          height={40}
          className="rounded-lg border-2"
        />{" "}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog dir={router.locale == "He" ? "rtl" : "ltr"} as="div" className="absolute z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-opacity-25 fixed inset-0 bg-black/20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-start text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease duration-300 transform"
                enterFrom="opacity-0 ltr:-translate-x-12 rtl:translate-x-12"
                enterTo="opacity-100 ltr:translate-x-0 rtl:translate-x-0"
                leave="transition ease duration-300 transform"
                leaveFrom="opacity-100 ltr:translate-x-0 rtl:translate-x-0"
                leaveTo="opacity-0 ltr:-translate-x-12 rtl:translate-x-12"
              >
                <Dialog.Panel className="bg-card flex h-screen w-4/6 transform flex-col px-4 pt-6 pb-4 shadow-xl transition-all ltr:rounded-r-lg rtl:rounded-l-lg">
                  {user ? (
                    <div className="flex w-full flex-col items-center justify-center">
                      <Image
                        loading="lazy"
                        alt="user avatar"
                        src={user?.avatarURL! || "https://nauth-avatars.s3.eu-north-1.amazonaws.com/avatar/default.png"}
                        width={80}
                        height={80}
                        className="rounded-lg border-2"
                      />

                      <div className="text-foreground my-2 text-2xl font-semibold">{(user?.name && `${user?.name}`) || user?.email}</div>
                    </div>
                  ) : (
                    <div className="text-foreground flex w-full items-center justify-center pt-12 pb-8 text-xl">
                      <Link href={`/auth/register?redirect=${router.asPath}`} className="pr-1 font-semibold">
                        {"Register"} /
                      </Link>

                      <Link className="font-semibold" href={`/auth/login?redirect=${router.asPath}`}>
                        {"Login"}
                      </Link>
                    </div>
                  )}

                  {user && (
                    <>
                      <Link
                        onClick={closeModal}
                        href={`/account`}
                        className={`${"text-foreground active:bg-accent active:text-accent-foreground rounded-lg font-semibold"} rounded-mdclassName= group flex w-full items-center py-2 text-lg`}
                      >
                        <FiUser className={`mx-2`} height={24} width={24} />
                        {"My account"}
                      </Link>
                    </>
                  )}

                  {isAnyAdmin(user!) && (
                    <>
                      <div className="my-4" />

                      <Link
                        onClick={closeModal}
                        href={`/admin/`}
                        className={`${"text-card-foreground active:bg-accent active:text-accent-foreground rounded-lg font-semibold"} rounded-mdclassName= group flex w-full items-center py-2 text-lg`}
                      >
                        <FiShield className={`mx-2`} height={24} width={24} />
                        {"Admin"}
                      </Link>
                    </>
                  )}
                  <div className="my-4" />

                  {user && (
                    <button
                      onClick={async () => {
                        closeModal();
                        await NAUTH_API.Client.Session.Revoke({});
                      }}
                      className={`${"text-foreground active:bg-accent active:text-accent-foreground rounded-lg font-semibold"} rounded-mdclassName= group flex w-full items-center py-2 text-lg`}
                    >
                      <BiLogOut className={`mx-2`} height={24} width={24} />

                      {"Log out"}
                    </button>
                  )}

                  <Link
                    href={`/`}
                    className={`${"text-foreground active:bg-accent active:text-accent-foreground rounded-lg font-semibold"} rounded-mdclassName= group flex w-full items-center py-2 text-lg`}
                  >
                    <BiHome className={`mx-2`} height={24} width={24} />

                    {"Home"}
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
