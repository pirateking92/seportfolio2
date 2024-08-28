// app/about/page.tsx
import Image from "next/image";
import client from "../../apollo-client";
import { GET_ABOUT_PAGE } from "../lib/queries";

async function getAboutPageData() {
  const { data } = await client.query({
    query: GET_ABOUT_PAGE,
  });

  return {
    title: data.page.title,
    content: data.page.content,
    profilePicture:
      data.page.profilePicture?.profilePicture?.node?.sourceUrl || "",
  };
}

export async function generateMetadata() {
  const { title } = await getAboutPageData();
  return { title: `About - ${title}` };
}

export default async function About() {
  const { title, content, profilePicture } = await getAboutPageData();

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* Text content */}
        <div className="flex-1 mb-8 md:mb-0">
          <h1 className="text-4xl text-white font-bold mb-4 text-center lg:text-left">
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
}
