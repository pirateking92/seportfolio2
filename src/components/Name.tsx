// components/Name.tsx
"use-client";
import Head from "next/head";
import parse from "html-react-parser";
import SmokeFadeIn from "./SmokeFadeIn";

interface NameProps {
  siteTitle: string;
  siteDescription: string;
  profilePicture;
}

const Name: React.FC<NameProps> = ({
  siteTitle,
  siteDescription,
  profilePicture,
}) => (
  <SmokeFadeIn>
    <div>
      <div>
        <h1 className="py-5 text-4xl text-white font-bold mb-4 text-center">
          {siteTitle}
        </h1>
        <p className="text-center text-2xl text-slate-400">
          {parse(siteDescription)}
        </p>
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none block md:hidden"
          style={{ backgroundImage: `url(${profilePicture})` }}
        ></div>
      </div>
    </div>
  </SmokeFadeIn>
);

export default Name;
