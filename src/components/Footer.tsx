"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const Footer: React.FC = () => {
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

    ScrollTrigger.create({
      trigger: document.documentElement, // Observe the entire page
      start: "bottom bottom", // Trigger when bottom of viewport reaches the bottom of the page
      end: "max", // Optional but ensures it tracks to the end
      onEnter: () => showFooter.play(), // Fade in when reaching the bottom
      onLeaveBack: () => showFooter.reverse(), // Fade out when scrolling up
    });

    return () => {
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
