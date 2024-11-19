import client from "../../../../apollo-client";
import PageContent from "@/components/PageContent";
import Navbar from "@/components/Navbar";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";
import SmokeFadeIn from "@/components/SmokeFadeIn";

interface PageContentProps {
  id: string;
  uri: string;
  pageContent: string;
  pageTitle: string;
  imageData: string;
}

const getPageData = async (uri: string) => {
  const { data } = await client.query({
    query: GET_PAGE_IMAGE_AND_CONTENT,
    variables: { id: uri },
  });

  if (!data || !data.page) {
    return null;
  }

  return {
    id: data.page.id,
    pageContent: data.page.content,
    pageTitle: data.page.title,
    uri: data.page.uri,
    imageData: data.page.showInGallery.mainImage.node.sourceUrl,
  };
};

export default async function ProductionPage(props: {
  params: Promise<{ uri: string[] }>;
}) {
  const { uri } = await props.params;
  const pageData = await getPageData(uri.join("/"));

  if (!pageData) {
    return <div>Production Not Found</div>;
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <SmokeFadeIn>
        <div className="flex flex-col pt-16 md:pt-20 justify-center items-center mx-auto w-full max-w-screen-lg px-4">
          <PageContent {...pageData} />
        </div>
      </SmokeFadeIn>
      {pageData.imageData && (
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
          // style={{ backgroundImage: `url(${pageData.imageData})` }}
        ></div>
      )}
    </div>
  );
}
