import client from "../../../../apollo-client";
import PageContent from "@/components/PageContent";
import Navbar from "@/components/Navbar";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";
import { metadata as globalMetadata } from "@/app/layout";
import SmokeFadeIn from "@/components/SmokeFadeIn";

interface PageContentProps {
  id: string;
  uri: string;
  pageContent: string;
  pageTitle: string;
  imageData: string;
}

export async function generateMetadata({
  params,
}: {
  params: { uri: string[] };
}) {
  const uri = params.uri.join("/");
  const pageData = await getPageData(uri);

  if (!pageData) {
    return { title: "Production Not Found" };
  }

  return {
    title: `${pageData.pageTitle} | Sepy Baghaei`,
    ...globalMetadata,
  };
}

export const getPageData = async (uri: string) => {
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
  params: { uri: string[] };
}) {
  const { uri } = await props.params;
  const pageData = await getPageData(uri.join("/"));

  if (!pageData) {
    return <div>Production Not Found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SmokeFadeIn>
        <div className="pt-16 md:pt-20">
          <PageContent {...pageData} />
        </div>
      </SmokeFadeIn>
      {pageData.imageData && (
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${pageData.imageData})` }}
        ></div>
      )}
    </div>
  );
}
