"use client";

import { useEffect, useState } from "react";
import { X, ShoppingBag, Heart, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToastStore, type Toast } from "@/store/toastStore";
import { cn } from "@/lib/utils";

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const iconMap = {
    cart: <ShoppingBag size={16} strokeWidth={1.5} />,
    success: <CheckCircle size={16} strokeWidth={1.5} />,
    error: <AlertCircle size={16} strokeWidth={1.5} />,
    info: <Info size={16} strokeWidth={1.5} />,
  };

  const accentMap: Record<Toast["type"], string> = {
    cart: "var(--color-ink)",
    success: "#2d7a4f",
    error: "#a33a2a",
    info: "var(--color-muted)",
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{ "--accent": accentMap[toast.type] } as React.CSSProperties}
      className={cn(
        "group relative flex min-w-[280px] max-w-sm items-start gap-3 overflow-hidden border border-[var(--border-light)] bg-[var(--color-white)] px-4 py-3.5 shadow-lg",
        "transition-all duration-300",
        isLeaving
          ? "translate-x-full opacity-0"
          : "translate-x-0 opacity-100 animate-toast-in"
      )}
    >
      {/* Left accent bar */}
      <span
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{ backgroundColor: "var(--accent)" }}
      />

      {/* Icon */}
      <span
        className="mt-0.5 shrink-0"
        style={{ color: "var(--accent)" }}
      >
        {iconMap[toast.type]}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="font-sans text-xs font-medium text-[var(--color-ink)] leading-tight">
          {toast.message}
        </p>
        {toast.description && (
          <p className="mt-0.5 font-sans text-[11px] text-[var(--color-muted)] leading-snug">
            {toast.description}
          </p>
        )}
      </div>

      {/* Close */}
      <button
        onClick={handleRemove}
        aria-label="Bildirimi kapat"
        className="shrink-0 text-[var(--color-stone-400)] transition-colors hover:text-[var(--color-ink)] mt-0.5"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-label="Bildirimler"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-end"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
