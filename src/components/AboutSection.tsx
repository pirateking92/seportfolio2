// app/components/AboutSection.tsx
"use-client";

import SmokeFadeIn from "./SmokeFadeIn";
import Image from "next/image";

interface AboutProps {
  title: string;
  content: string;
  profilePicture: string;
}

function AboutSection({ title, content, profilePicture }) {
  return (
    <SmokeFadeIn>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Profile Picture */}
          {profilePicture && (
            <div className="flex justify-center items-center mb-16 ">
              <Image
                src={profilePicture}
                alt="Profile Picture"
                height={600}
                width={400}
                className="rounded-xl"
              />
            </div>
          )}
          {/* Text content */}
          <div className="flex-1 mb-8 md:mb-0">
            <h1 className="font-bodyFont text-4xl text-white mb-4 text-left lg:text-left">
              {title}
            </h1>
            <div
              className="prose-lg text-white"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </SmokeFadeIn>
  );
}

export default AboutSection;
