import client from "../../../apollo-client";
import { GET_ABOUT_PAGE, GET_ALL_MEDIA_ITEMS } from "../../lib/queries";
import AboutSection from "@/components/AboutSection";
import SmokeFadeIn from "@/components/SmokeFadeIn";

async function getPageData() {
  const { data: aboutData } = await client.query({ query: GET_ABOUT_PAGE });

  const profilePicture = aboutData.page.profilePicture?.profilePicture
    ?.node || {
    sourceUrl: "",
    altText: "",
    id: "",
  };

  return {
    title: aboutData.page.title,
    content: aboutData.page.content,
    profilePicture,
  };
}

export default async function AboutPage() {
  const { title, content, profilePicture } = await getPageData();

  return (
    <div className="mb-12 sm:mb-16 pt-24">
      <AboutSection
        profilePicture={profilePicture.sourceUrl}
        title={title}
        content={content}
      />
    </div>
  );
}
