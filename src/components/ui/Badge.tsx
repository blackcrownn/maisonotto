import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline" | "sale";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-none px-2 py-0.5 text-[9px] font-sans font-medium tracking-wider uppercase select-none border",
        {
          "bg-[var(--color-ink)] text-[var(--color-white)] border-transparent":
            variant === "primary",
          "bg-[var(--color-stone-100)] text-[var(--color-stone-500)] border-transparent":
            variant === "secondary",
          "border-[var(--border-strong)] text-[var(--color-ink)] bg-transparent":
            variant === "outline",
          "bg-stone-900 text-white border-transparent":
            variant === "sale",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
