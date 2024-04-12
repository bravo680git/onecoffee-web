"use client";
import clsx from "clsx";
import { Add, AddCircle, InfoCircle, NotificationCircle } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title?: string;
  content?: string;
  onOk?(): Promise<void>;
  onClose?(): void;
  className?: string;
  okCancel?: boolean;
};
type ModalType = "error" | "info";

const msgDist: Record<ModalType, { btnClass: string; icon: React.ReactNode }> =
  {
    error: {
      btnClass: "bg-rose-500",
      icon: <AddCircle className="rotate-45 text-rose-500" size={20} />,
    },
    info: {
      btnClass: "bg-blue-500",
      icon: <InfoCircle size={20} className="text-blue-500" />,
    },
  };

function Modal({
  title,
  content,
  onOk,
  type = "info",
  open,
  className,
  okCancel,
  onClose,
}: ModalProps & { type?: ModalType; open: boolean }) {
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    if (onOk && !loading) {
      setLoading(true);
      onOk().finally(() => {
        setLoading(false);
        onClose?.();
      });
    }
  };
  return (
    <div
      className={clsx(
        "invisible fixed bottom-0 left-0 right-0 top-0 z-10 bg-black/20 opacity-0 transition-all duration-300",
        {
          "!visible !opacity-100": open,
        },
      )}
      onClick={onClose}>
      <div
        className={clsx(
          "absolute left-1/2 top-1/2 min-w-[200px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4",
          "opacity-0 transition-[opacity] duration-300",
          { "!opacity-100": open },
          className,
        )}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          {msgDist[type].icon}
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <i
          className="absolute right-2 top-2 cursor-pointer rounded-md p-0.5 transition-all hover:bg-black/10"
          onClick={onClose}>
          <Add className="rotate-45" size={20} />
        </i>
        {content && <p className="mt-4">{content}</p>}
        <div className="mt-4 flex justify-end gap-2">
          {okCancel && (
            <button
              className="ripple rounded-md border border-slate-200 px-3 py-1"
              onClick={onClose}>
              Hủy
            </button>
          )}
          {onOk && (
            <button
              onClick={handleOk}
              disabled={loading}
              className={clsx(
                "ripple flex items-center justify-center gap-2 rounded-md px-3 py-1 font-semibold text-white",
                msgDist[type].btnClass,
              )}>
              {loading && (
                <NotificationCircle size={16} className="animate-spin" />
              )}
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function useModal() {
  const [data, setData] = useState<ModalProps & { type: ModalType }>();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handle = (props: ModalProps & { type: ModalType }) => {
    setData(props);
    setOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const ctxHolder =
    mounted &&
    createPortal(
      <Modal {...data} onClose={() => setOpen(false)} open={open} />,
      document.body,
    );

  const api = {
    error: (props: ModalProps) => handle({ ...props, type: "error" }),
    info: (props: ModalProps) => handle({ ...props, type: "info" }),
  };

  return { modelApi: api, modelCtxHoler: ctxHolder };
}

export default Modal;
