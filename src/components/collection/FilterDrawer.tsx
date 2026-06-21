"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "../ui/Button";

interface FilterDrawerProps {
  hideCategory?: boolean;
}

export function FilterDrawer({ hideCategory = false }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close body scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <>
      {/* Drawer Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 md:hidden"
      >
        <SlidersHorizontal size={14} />
        Filtrele
      </Button>

      {/* Drawer Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true" aria-label="Filtre Seçenekleri">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex h-full w-80 max-w-[85vw] flex-col bg-white p-6 shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4 mb-6">
                <span className="font-serif text-lg font-medium text-[var(--color-ink)]">Filtrele</span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Filtreleri kapat"
                  className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)]"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Scrollable Filters */}
              <div className="flex-1 overflow-y-auto pr-2">
                <FilterSidebar hideCategory={hideCategory} className="border-none p-0 shadow-none w-full" />
              </div>

              {/* Sticky Apply Button */}
              <div className="border-t border-[var(--border-light)] pt-4 mt-6">
                <Button variant="primary" size="full" onClick={() => setIsOpen(false)}>
                  Uygula
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
