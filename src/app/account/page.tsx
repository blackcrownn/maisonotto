"use client";

import Image from "next/image";
import LoginCard from "@/components/account/LoginCard";

export default function AccountPage() {
  return (
    <main className="min-h-[calc(100vh-var(--header-height))] bg-[#faf8f5] flex">
      {/* Left Column: Premium Fashion Banner (Hidden on Mobile) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <Image
          src="/images/login_side_banner.png"
          alt="Maison Otto Timeless Style"
          fill
          sizes="50vw"
          priority
          className="object-cover object-[65%_center] opacity-80"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/15 z-10" />

        {/* Text Overlay */}
        <div className="relative z-20 text-center px-12 max-w-xl">
          <h2 className="font-serif text-5xl font-light !text-white tracking-[0.25em] mb-4 uppercase">
            Maison Otto
          </h2>
          <div className="h-px bg-white/20 w-16 mx-auto mb-4" />
          <p className="font-sans text-[11px] font-light !text-white/90 tracking-[0.18em] uppercase">
            Timeless Style. Modern Essence.
          </p>
        </div>
      </div>

      {/* Right Column: Account Card Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[calc(100vh-var(--header-height))] p-6 md:p-12">
        <LoginCard />
      </div>
    </main>
  );
}
