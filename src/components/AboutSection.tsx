// app/components/AboutSection.tsx
import Image from "next/image";

interface AboutProps {
  title: string;
  content: string;
  profilePicture: string;
}

const AboutSection: React.FC<AboutProps> = ({
  title,
  content,
  profilePicture,
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* Text content */}
        <div className="flex-1 mb-8 md:mb-0">
          <h1 className="font-bodyFont text-4xl text-white font-bold mb-4 text-center lg:text-left">
            {title}
          </h1>
          <div
            className="prose-lg text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {/* Profile Picture */}
        {profilePicture && (
          <div className="justify-center items-center w-full max-w-[500px] h-[500px] hidden lg:block md:flex-1">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              height={600}
              width={400}
              className="rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
