"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand/20 bg-black shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-48 sm:h-14 sm:w-56">
            <Image
              src="https://www.firstflexilease.com/wp-content/uploads/2020/05/cropped-logo-png.png"
              alt="First Flexi Lease"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="h-8 w-1 bg-brand rounded-full"></div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand to-transparent"></div>
    </header>
  );
}
