"use client";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  openInNewTab?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  title,
  openInNewTab = false,
}) => {
  const linkClass =
    "block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white";

  if (openInNewTab) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {title}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {title}
    </Link>
  );
};

export default NavLink;
