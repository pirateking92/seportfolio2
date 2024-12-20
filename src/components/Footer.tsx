"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footerElement = footerRef.current;

    // Animate opacity based on scroll position
    const showFooter = gsap.fromTo(
      footerElement,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, paused: true }
    );

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "bottom bottom",
      onEnter: () => showFooter.play(),
      onLeaveBack: () => showFooter.reverse(),
    });

    // forced refresh to ensure proper initialisation (wasnt loading properly on load)
    ScrollTrigger.refresh();

    // Check the scroll position immediately
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      showFooter.play(); // Show the footer if already at the bottom
    }

    return () => {
      trigger.kill(); // Clean up the ScrollTrigger instance
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="mt-5 bg-black py-4 px-6 flex items-center justify-between opacity-0"
    >
      {/* Left: Link to maker's website */}
      <div className="relative">
        <Link
          href="https://mattdoyle.vercel.app"
          target="_blank"
          className="text-sm text-white hover:text-gray-300 transition"
        >
          Designed by Matt Doyle
        </Link>
      </div>

      {/* Right: Static content */}
      <div className="flex items-center sm:justify-end justify-center text-sm text-gray-100">
        <a
          href="https://www.instagram.com/sepy.baghaei/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="pr-3 text-white/70 hover:text-white transition-colors duration-200 flex items-center"
        >
          <SiInstagram size={24} />
        </a>
        <span>
          &copy; {new Date().getFullYear()} Sepy Baghaei. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
