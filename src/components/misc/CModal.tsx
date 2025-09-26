import { Button } from "@/components/ui/button";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { forwardRef, Fragment, useCallback, useEffect, useImperativeHandle, useState } from "react";

type CModalProps = {
  className?: string;
  button?: any;
  buttonNoPadding?: boolean;
  nopadding?: boolean;
  children: any;
  title: string | any;
  textTitle?: string;
  danger?: boolean;
  disableOutFrameClose?: boolean;
  preOpenCallback?: () => void;
  preCloseCallback?: () => void;
};

function CModalComponent(
  {
    children,
    nopadding,
    title,
    textTitle,
    button,
    className,
    danger,
    buttonNoPadding,
    disableOutFrameClose,
    preOpenCallback,
    preCloseCallback,
  }: CModalProps,
  ref: React.ForwardedRef<{ closeModal: () => void; openModal: () => void }>,
) {
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    if (preCloseCallback) preCloseCallback();
    setIsOpen(false);
  }, [preCloseCallback]);

  const openModal = useCallback(() => {
    if (preOpenCallback) preOpenCallback();
    setIsOpen(true);
  }, [preOpenCallback]);

  useImperativeHandle(ref, () => {
    return {
      closeModal: closeModal,
      openModal: openModal,
    };
  }, [openModal, closeModal]);

  useEffect(() => {
    closeModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <>
      <div onClick={openModal} className="flex-shrink-0">
        {button || <Button>{textTitle || title}</Button>}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-50 ${className}`}
          onClose={() => {
            if (!disableOutFrameClose) closeModal();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-fit transform rounded-2xl bg-card ${!nopadding && "p-6"} text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title as="h3" hidden={!title} className="mb-4 text-lg leading-6 font-medium text-card-foreground">
                    {title}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const CModal = forwardRef(CModalComponent);

export default CModal;
