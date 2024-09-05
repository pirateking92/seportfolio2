"use-client";

import React from "react";
import NavLink from "./NavLink";

interface NavLinkProps {
  title: string;
  path: string;
  openInNewTab?: boolean;
}

interface MenuOverlayProps {
  links: NavLinkProps[];
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links }) => (
  <ul className="font-headingFont flex flex-col py-4 items-center bg-slate-900">
    {links.map((link, index) => (
      <li key={index}>
        <NavLink
          href={link.path}
          title={link.title}
          openInNewTab={link.openInNewTab}
        />
      </li>
    ))}
  </ul>
);

export default MenuOverlay;
