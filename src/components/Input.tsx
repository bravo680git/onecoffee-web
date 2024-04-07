import clsx from "clsx";

export type InputProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange(v: string): void;
  className?: string;
};

function Input({
  onChange,
  value,
  error,
  label,
  placeholder,
  className,
}: InputProps) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 rounded-md border border-slate-200 px-3 transition-all duration-300 focus:shadow-primary"
      />
      <span className="h-4 text-xs text-red-500">{error}</span>
    </div>
  );
}

export default Input;
