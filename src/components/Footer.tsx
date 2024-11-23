"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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
          Made by Matt Doyle
        </Link>
      </div>

      {/* Right: Static content */}
      <p className="text-sm text-gray-100">
        &copy; {new Date().getFullYear()} Sepy Baghaei. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
