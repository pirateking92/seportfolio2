import React, { useState, useRef, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

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
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        className="flex items-center px-4 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white bg-opacity-50"
      >
        {isOpen ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <Bars3Icon className="h-5 w-5" />
        )}
      </button>

      <div
        ref={menuRef}
        className={`absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-black border border-gray-700 md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-2 flex flex-col items-center">
          {links.map((link, index) => (
            <div
              key={index}
              className="w-full text-center"
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
