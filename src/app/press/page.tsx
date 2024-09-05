import client from "../../../apollo-client";
import PageContent from "@/components/PageContent";
import Navbar from "@/components/Navbar";
import {
  GET_ALL_MEDIA_ITEMS,
  GET_PAGE_CONTENT,
  GET_PAGE_IMAGE,
} from "@/lib/queries";
import { metadata as globalMetadata } from "@/app/layout";
import SmokeFadeIn from "@/components/SmokeFadeIn";

interface PageContentProps {
  id: string;
  uri: string;
  pageContent: string;
  pageTitle: string;
  imageData: string | null;
}

interface MediaItem {
  soureUrl: string;
  caption: string;
  slug: string;
}

export async function generateMetadata() {
  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: "press" },
  });

  if (!data || !data.page) {
    return { title: "Press | Sepy Baghaei" };
  }

  return {
    title: `${data.page.title} | Sepy Baghaei`,
    ...globalMetadata,
  };
}

export default async function PressPage({
  params,
}: {
  params: { uri: string[] };
}) {
  const uri = `${params.uri}`;
  console.log(`Fetching data for URI: ${uri}`); // Debug log

  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: "press" },
  });

  if (!data || !data.page) {
    return <div>Page Not Found</div>;
  }

  const { data: imageData } = await client.query({
    query: GET_PAGE_IMAGE,
    variables: { captionSearch: data.page.title },
  });

  const pageProps: PageContentProps = {
    id: data.page.id,
    pageContent: data.page.content,
    pageTitle: data.page.title,
    uri: data.page.uri,
    imageData: imageData.mediaItems.nodes[0]?.sourceUrl || null,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SmokeFadeIn>
        <div className="pt-16 md:pt-20">
          <PageContent {...pageProps} />
        </div>
      </SmokeFadeIn>
      {pageProps.imageData && (
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${pageProps.imageData})` }}
        ></div>
      )}
    </div>
  );
}
