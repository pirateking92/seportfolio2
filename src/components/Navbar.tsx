"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import AnimatedDropdownMenu from "./AnimatedDropdownMenu";
import GradualSpacing from "./ui/gradual-spacing";
interface NavLink {
  title: string;
  path: string;
  openInNewTab?: boolean;
}

const navLinks: NavLink[] = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "CV",
    path: "/cv",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const showNav = gsap
      .fromTo(
        navbarRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
        }
      )
      .progress(1);

    ScrollTrigger.create({
      trigger: navbarRef.current,
      start: "top top",
      end: "max",
      scroller: document.documentElement,
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (navbarOpen) {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [navbarOpen]);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-50"
    >
      <div className="flex container items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg text-white sm:text-xl md:text-3xl lg:text-4xl"
        >
          <GradualSpacing
            className="font-bodyFont"
            text="Sepy Baghaei | Director & Playwright"
          />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className=" text-white flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  title={link.title}
                  openInNewTab={link.openInNewTab}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <AnimatedDropdownMenu links={navLinks} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
