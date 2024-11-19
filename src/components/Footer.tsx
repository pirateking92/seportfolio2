// components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <footer className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
      {/* Left: Link to maker's website */}
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link
          href="https://mattdoyle.vercel.app"
          target="_blank"
          className="text-sm text-gray-100 hover:text-gray-300 transition"
        >
          Made by Matt Doyle
        </Link>
      </div>

      {/* Right: Static content */}
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Sepy Baghaei. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
