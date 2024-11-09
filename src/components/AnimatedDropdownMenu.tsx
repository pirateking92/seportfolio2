import React, { useState, useRef, useEffect } from "react";
import NavLink from "./NavLink";

interface NavLinkItem {
  title: string;
  path: string;
  openInNewTab?: boolean;
}

interface DropdownMenuProps {
  links: NavLinkItem[];
}

const AnimatedDropdownMenu: React.FC<DropdownMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) {
        setIsOpen(!isOpen);
        return;
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center px-4 py-2 text-slate-200 hover:text-white hover:border-white bg-opacity-50"
        aria-label="Toggle menu"
      >
        <div className="relative w-[50px] h-[40px]">
          <span
            className={`absolute h-[5px] w-full bg-current rounded-[3px] transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "rotate-45 top-1/2 -translate-y-1/2"
                : "rotate-0 top-[8px]"
            }`}
          />
          <span
            className={`absolute h-[5px] w-full bg-current rounded-[3px] transition-all duration-300 ease-in-out top-1/2 
            ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
          />
          <span
            className={`absolute h-[5px] w-full bg-current rounded-[3px] transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "-rotate-45 top-1/2 -translate-y-1/2"
                : "rotate-0 top-[32px]"
            }`}
          />
        </div>
      </button>
      <div
        ref={menuRef}
        className={`fixed inset-x-0 top-16 -bottom-0 z-20 flex flex-col items-start justify-center bg-black bg-opacity-90 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="ml-4 space-y-4">
          {links.map((link, index) => (
            <div
              key={index}
              className="relative text-4xl hover:underline text-white"
              onClick={() => setIsOpen(false)}
            >
              <NavLink
                href={link.path}
                title={link.title}
                openInNewTab={link.openInNewTab}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedDropdownMenu;
