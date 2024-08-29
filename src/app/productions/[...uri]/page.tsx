// app/productions/[...uri]/page.tsx
import client from "../../../../apollo-client";
import PageContent from "@/components/PageContent";
import Navbar from "@/components/Navbar";
import {
  GET_ALL_URIS,
  GET_PAGE_CONTENT,
  GET_PAGE_IMAGE,
} from "../../../lib/queries";

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

  return data.pages.nodes.map((page: { uri: string }) => ({
    uri: page.uri.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { uri?: string[] };
}) {
  if (!params.uri) {
    return null; // or a default component
  }

  const uri = params?.uri?.length ? `/${params.uri.join("/")}` : "/";

  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: uri },
  });

  if (!data || !data.page) {
    return { title: "Sepy Baghaei" };
  }

  return {
    title: data.page.title,
  };
}

export default async function ProductionPage({
  params,
}: {
  params: { uri?: string[] };
}) {
  const uri = params?.uri?.length ? `/${params.uri.join("/")}` : "/";

  // Ensure `uri` is in the correct format
  const formattedUri = uri.startsWith("/") ? uri.slice(1) : uri;

  console.log(`Fetching data for URI: ${formattedUri}`); // Debug log

  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
    variables: { id: formattedUri },
  });

  if (!data || !data.page) {
    return <div>Page Not Found</div>;
  }

  const { data: imageData } = await client.query({
    query: GET_PAGE_IMAGE,
    variables: { captionSearch: data.page.title },
  });

  const firstImage = imageData.mediaItems.nodes[0];

  const pageProps: PageContentProps = {
    id: data.page.id,
    pageContent: data.page.content,
    pageTitle: data.page.title,
    uri: data.page.uri,
    imageData: firstImage ? firstImage.sourceUrl : null,
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
