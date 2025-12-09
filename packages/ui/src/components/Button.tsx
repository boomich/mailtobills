import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const getVariantClasses = (variant: ButtonVariant) => {
  if (variant === "secondary") {
    return "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 focus-visible:outline-gray-300";
  }

  return "bg-black text-white hover:bg-black/90 focus-visible:outline-black";
};

export const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  const classes = cn(baseClasses, getVariantClasses(variant), className);

  return <button className={classes} {...props} />;
};
