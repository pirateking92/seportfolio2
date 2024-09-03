import client from "../../../../apollo-client";
import PageContent from "@/components/PageContent";
import Navbar from "@/components/Navbar";
import { GET_ALL_URIS, GET_PAGE_CONTENT, GET_PAGE_IMAGE } from "@/lib/queries";

interface PageContentProps {
  id: string;
  uri: string;
  pageContent: string;
  pageTitle: string;
  imageData: string | null;
}

export async function generateStaticParams() {
  const { data } = await client.query({
    query: GET_ALL_URIS,
  });
  return data.pages.nodes
    .filter((page: { uri: string }) => page.uri.startsWith(""))
    .map((page: { uri: string }) => ({
      uri: page.uri.split("/").slice(1), // Remove 'productions' from the beginning
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { uri: string[] };
}) {
  const uri = `${params.uri.join("/")}`;
  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: uri },
  });

  if (!data || !data.page) {
    return { title: "Production Not Found" };
  }

  return {
    title: `${data.page.title} | Sepy Baghaei`,
  };
}

export default async function ProductionPage({
  params,
}: {
  params: { uri: string[] };
}) {
  const uri = `${params.uri.join("/")}`;
  console.log(`Fetching data for URI: ${uri}`); // Debug log

  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: uri },
  });

  if (!data || !data.page) {
    return <div>Production Not Found</div>;
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
      <div className="pt-16 md:pt-20">
        <PageContent {...pageProps} />
      </div>
      {pageProps.imageData && (
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${pageProps.imageData})` }}
        ></div>
      )}
    </div>
  );
}
