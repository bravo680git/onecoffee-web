import clsx from "clsx";
import { NotificationCircle } from "iconsax-react";

type ButtonProps = {
  children?: string;
  className?: string;
  type?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  size?: "xs" | "md" | "lg" | number;
  onClick?(): void;
};

function Button({
  children,
  className,
  type = "outline",
  loading,
  size = "md",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "ripple flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 transition-all duration-300",
        {
          "bg-primary-500 font-semibold text-white active:shadow-primary":
            type === "primary",
          "bg-secondary-500 font-semibold text-white active:shadow-secondary":
            type === "secondary",
          "border border-slate-200": type === "outline",
          "h-6": size === "xs",
          "h-8": size === "md",
          "h-10": size === "lg",
          [`h-${size}`]: typeof size === "number",
          "!cursor-not-allowed opacity-80": loading || disabled,
        },
        className,
      )}
      onClick={loading || disabled ? undefined : onClick}
      aria-disabled={loading || disabled}
      disabled={loading || disabled}>
      {loading && (
        <NotificationCircle size={20} className={clsx("animate-spin")} />
      )}
      {children}
    </button>
  );
}

export default Button;
