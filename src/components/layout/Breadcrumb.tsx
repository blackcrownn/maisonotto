import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link
            href="/"
            aria-label="Ana Sayfa"
            className="flex items-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <Home size={12} strokeWidth={1.5} />
          </Link>
          <meta itemProp="name" content="Ana Sayfa" />
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-1"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight size={10} strokeWidth={1.5} className="text-[var(--color-stone-300)]" />
            {item.href ? (
              <Link
                href={item.href}
                itemProp="item"
                className="text-caption text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-caption text-[var(--color-ink)]" itemProp="name" aria-current="page">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
