import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fd-color-focus)]";

const variantStyles: Record<string, string> = {
  primary:
    "bg-[var(--fd-color-primary)] text-[var(--fd-color-primary-foreground)] hover:bg-[#ff5e40] shadow-[var(--fd-shadow-sm)] hover:shadow-[var(--fd-shadow)]",
  secondary: "bg-[var(--fd-color-secondary)] text-white hover:bg-[#1d4ed8]",
  outline:
    "border border-[var(--fd-color-border)] text-[var(--fd-color-text)] hover:bg-[var(--fd-color-surface-alt)]",
  ghost:
    "text-[var(--fd-color-text-muted)] hover:text-[var(--fd-color-text)] hover:bg-[var(--fd-color-surface-alt)]",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[color-mix(in_srgb,var(--fd-color-primary)_60%,transparent)] border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

export default Button;
