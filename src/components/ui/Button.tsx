"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(
          "inline-flex items-center justify-center font-sans text-label transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] disabled:pointer-events-none disabled:opacity-50",
          // Variants
          {
            "bg-[var(--color-ink)] text-[var(--color-white)] hover:bg-neutral-800 active:bg-neutral-900":
              variant === "primary",
            "bg-[var(--color-off-white)] text-[var(--color-ink)] border border-[var(--border-base)] hover:bg-[var(--color-cream)]":
              variant === "secondary",
            "border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-white)]":
              variant === "outline",
            "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-stone-50)]":
              variant === "ghost",
            "bg-transparent text-[var(--color-ink)] underline-offset-4 hover:underline p-0 h-auto":
              variant === "link",
          },
          // Sizes
          {
            "px-4 py-2 text-[10px] tracking-widest": size === "sm",
            "px-8 py-3.5 text-xs tracking-[0.15em]": size === "md",
            "px-10 py-4 text-xs tracking-[0.2em]": size === "lg",
            "w-full py-4 text-xs tracking-[0.15em]": size === "full",
          },
          isLoading && "relative text-transparent select-none",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-4 w-4 animate-spin text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
