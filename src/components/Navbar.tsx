"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface NavLink {
  title: string;
  path: string;
}

const navLinks: NavLink[] = [
  {
    title: "Press",
    path: "/press",
  },
  {
    title: "CV",
    path: "/SEPY BAGHAEI CV 2024-1.png",
  },
  {
    title: "Productions",
    path: "/productions",
  },
];

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

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
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-100"
    >
      <div className="flex container lg:py-4 px-3 items-center justify-between mx-auto py-2">
        {/* Logo */}
        <h1>
          <Link href={"/"} className="text-xl md:text-3xl text-white">
            Sepy Baghaei | Director
          </Link>
        </h1>
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className=" text-white flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-4 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white bg-opacity-50"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
