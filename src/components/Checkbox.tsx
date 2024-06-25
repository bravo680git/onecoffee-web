import clsx from "clsx";

export type CheckboxProps = {
  label?: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

function Checkbox({ label, value, onChange }: CheckboxProps) {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 hover:opacity-90"
      onClick={() => onChange(!value)}>
      <div
        className={clsx(
          "relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-[4px] border border-slate-200",
        )}>
        <svg
          className={clsx(
            "z-10 transition-all",
            value
              ? "rotate-0 text-white opacity-100"
              : "rotate-90 text-primary-500 opacity-0",
          )}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
        </svg>
        <div
          className={clsx(
            "absolute left-1/2 top-1/2 h-0 w-0 translate-x-[-50%] translate-y-[-50%] bg-transparent opacity-0 transition-all duration-300",
            {
              "!h-8 !w-8 rounded-full !bg-primary-500 !opacity-100": value,
            },
          )}></div>
      </div>
      <span className="text-neutral-text-secondary">{label}</span>
    </div>
  );
}

export default Checkbox;
