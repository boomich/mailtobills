export function Logo(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-slate-900 dark:text-white"
      {...props}
    >
      <rect
        x="6"
        y="6"
        rx="8"
        width="36"
        height="36"
        strokeWidth="2"
        stroke="currentColor"
      />

      <path
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        d="M12 16L24 25L36 16"
        strokeLinejoin="round"
      />
      <path
        d="M16 30H32"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M16 34H26"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
