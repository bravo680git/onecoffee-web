import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-react";
import { KeyboardEvent, useState } from "react";

export type InputProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange(v: string): void;
  onBlur?(): void;
  className?: string;
  password?: boolean;
  onEnter?(): void;
  id?: string;
  name?: string;
  required?: boolean;
};

function Input({
  onChange,
  onBlur,
  value,
  error,
  label,
  placeholder,
  className,
  password,
  onEnter,
  required,
}: InputProps) {
  const [hidden, setHidden] = useState(true);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className={clsx("relative flex flex-col gap-1", className)}>
      {label && (
        <label>
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <input
        type={password && hidden ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-8 rounded-md border border-slate-200 bg-transparent px-3 transition-all duration-300 focus:shadow-primary"
      />
      {password && (
        <i
          onClick={() => setHidden(!hidden)}
          className="absolute bottom-[25px] right-2 text-neutral-text-secondary">
          {hidden ? (
            <Eye variant="Bold" size={20} />
          ) : (
            <EyeSlash variant="Bold" size={20} />
          )}
        </i>
      )}
      <span
        className={clsx("h-4 text-xs text-red-500 opacity-0 transition-all", {
          "!opacity-100": !!error,
        })}>
        {error}
      </span>
    </div>
  );
}

export default Input;
