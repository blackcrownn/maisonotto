import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  price,
  salePrice,
  size = "md",
  className,
  ...props
}: PriceDisplayProps) {
  const hasDiscount = salePrice !== undefined && salePrice < price;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-sans font-light text-[var(--color-ink)]",
        {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-lg md:text-xl": size === "lg",
        },
        className
      )}
      {...props}
    >
      {hasDiscount && salePrice ? (
        <>
          <span className="font-semibold text-[var(--color-ink)]">
            {formatPrice(salePrice)}
          </span>
          <span className="text-[var(--color-muted)] line-through font-normal opacity-70">
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span>{formatPrice(price)}</span>
      )}
    </div>
  );
}
