"use client";
import clsx from "clsx";
import { AddCircle, InfoCircle, TickCircle } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type MessageProps = {};
type MessageType = "error" | "success" | "info";

const msgDist: Record<MessageType, { class: string; icon: React.ReactNode }> = {
  error: {
    class: "bg-rose-400/10 text-rose-500",
    icon: <AddCircle className="rotate-45" size={20} />,
  },
  info: {
    class: "text-blue-500 bg-blue-400/10",
    icon: <InfoCircle size={20} />,
  },
  success: {
    class: "text-green-500 bg-green-400/10",
    icon: <TickCircle size={20} />,
  },
};

function Message({ title, type }: { title?: string; type: MessageType }) {
  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 z-50 translate-y-[100px] rounded-md  p-4  opacity-0",
        "transition-all duration-300",
        msgDist[type].class,
        {
          "!translate-y-0 !opacity-100": title,
        },
      )}>
      <div className="flex items-center gap-2">
        <i>{msgDist[type].icon}</i>
        <span className="font-semibold">{title}</span>
      </div>
    </div>
  );
}

export function useMessage() {
  const [message, setMessage] = useState<string | undefined>();
  const [type, setType] = useState<MessageType>("info");
  const [mounted, setMounted] = useState(false);

  const handle = ({
    type,
    message,
  }: {
    type?: MessageType;
    message: string;
  }) => {
    setMessage(message);
    setType(type ?? "info");
    setTimeout(() => {
      setMessage("");
      setType("info");
    }, 5000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const ctxHolder =
    mounted &&
    createPortal(<Message type={type} title={message} />, document.body);

  const api = {
    success: ({ message }: { message: string }) =>
      handle({ message, type: "success" }),
    error: ({ message }: { message: string }) =>
      handle({ message, type: "error" }),
    info: ({ message }: { message: string }) =>
      handle({ message, type: "info" }),
  };

  return { msgApi: api, msgCtxHoler: ctxHolder };
}

export default Message;
