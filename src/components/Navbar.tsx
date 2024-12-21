"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { gsap } from "gsap";
import AnimatedDropdownMenu from "./AnimatedDropdownMenu";
import GradualSpacing from "./ui/gradual-spacing";

interface NavLink {
  title: string;
  path: string;
  openInNewTab?: boolean;
}

const navLinks: NavLink[] = [
  { title: "About", path: "/about" },
  { title: "CV", path: "/cv" },
  { title: "Projects", path: "/productions" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const animation = useRef<GSAPTween | null>(null);
  const animationFrameId = useRef<number | null>(null); // Properly typed for requestAnimationFrame

  useEffect(() => {
    // Initialize navbar as visible
    if (navbarRef.current) {
      navbarRef.current.style.opacity = "1";
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only trigger animations if we've scrolled more than a tiny amount
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) {
        return;
      }

      // Kill any existing animation to prevent conflicts
      if (animation.current) {
        animation.current.kill();
      }

      // Scrolling up
      if (currentScrollY < lastScrollY.current) {
        animation.current = gsap.to(navbarRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      // Scrolling down and not at the top of the page
      else if (currentScrollY > 0) {
        animation.current = gsap.to(navbarRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    // Throttle the scroll handler using requestAnimationFrame
    const onScroll = () => {
      // Cancel any pending animation frame
      if (animationFrameId.current !== null) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
      // Schedule the new animation frame
      animationFrameId.current = window.requestAnimationFrame(() =>
        handleScroll()
      );
    };

    window.addEventListener("scroll", onScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", onScroll);
      // Cancel any pending animation frame
      if (animationFrameId.current !== null) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
      // Kill any existing GSAP animation
      if (animation.current) {
        animation.current.kill();
      }
    };
  }, []);

  // Menu animation effect for mobile menu
  useEffect(() => {
    const menuAnimation = gsap.to(menuRef.current, {
      height: navbarOpen ? "auto" : 0,
      opacity: navbarOpen ? 1 : 0,
      duration: navbarOpen ? 0.5 : 0.4,
      ease: navbarOpen ? "power2.out" : "power2.in",
    });

    return () => {
      menuAnimation.kill();
    };
  }, [navbarOpen]);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-50 mb-5"
    >
      {/* Rest of your JSX remains the same */}
      <div className="flex container items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="text-lg text-white sm:text-xl md:text-3xl lg:text-4xl"
        >
          <GradualSpacing
            className="font-bodyFont"
            text="Sepy Baghaei | Director & Playwright"
          />
        </Link>
        <div className="hidden md:block">
          <ul className="text-white flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
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
        <div className="md:hidden">
          <AnimatedDropdownMenu links={navLinks} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
