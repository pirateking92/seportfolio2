import client from "../../../../apollo-client";
import PageContent from "@/components/PageContent";
import {
  GET_PAGE_CAROUSEL_ITEMS,
  GET_PAGE_IMAGE_AND_CONTENT,
} from "@/lib/queries";
import SmokeFadeIn from "@/components/SmokeFadeIn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Navbar from "@/components/Navbar";

// interface PageContentProps {
//   id: string;
//   uri: string;
//   pageContent: string;
//   pageTitle: string;
//   imageData: string;
// }
const formatTitle = (uri: string) => {
  return uri.split("/").pop()?.replace(/-/g, " ") || uri;
};

const getPageData = async (uri: string) => {
  const formattedTitle = formatTitle(uri);

  const { data } = await client.query({
    query: GET_PAGE_IMAGE_AND_CONTENT,
    variables: { id: uri },
  });

  const { data: carouselData } = await client.query({
    query: GET_PAGE_CAROUSEL_ITEMS,
    variables: { title: formattedTitle },
  });

  if (!data?.page) {
    throw new Error(`No page found for URI: ${uri}`);
  }

  if (!carouselData?.mediaItems?.edges?.length) {
    throw new Error(`No carousel images found for title: ${formattedTitle}`);
  }

  return {
    id: data.page.id,
    pageContent: data.page.content,
    pageTitle: data.page.title,
    uri: data.page.uri,
    imageData: data.page.showInGallery.mainImage.node.sourceUrl,
    carouselImages: carouselData.mediaItems.edges.map(
      (edge: { node: { sourceUrl: string } }) => edge.node.sourceUrl
    ),
  };
};

export default async function ProductionPage(props: {
  params: Promise<{ uri: string[] }>;
}) {
  const { uri } = await props.params;

  try {
    const pageData = await getPageData(uri.join("/"));

    return (
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <SmokeFadeIn visibleOnLoad={false}>
            <Carousel
              opts={{ loop: true }}
              className=" w-full h-full pt-24 justify justify-center items-center"
            >
              <CarouselContent className="-ml-1">
                {pageData.carouselImages.map((imageUrl, index) => (
                  <CarouselItem
                    key={index}
                    className="flex pl-1 basis-1/3 items-center justify-center "
                  >
                    <div className="contain flex items-center justify-center">
                      <Image
                        src={imageUrl}
                        alt={`Carousel image ${index + 1}`}
                        height={600}
                        width={600}
                        objectFit="fill"
                        className="rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="opacity-15" />
              <CarouselNext className="opacity-15" />
            </Carousel>
            <PageContent {...pageData} />
          </SmokeFadeIn>
          {pageData.imageData && (
            <div className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"></div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
      </div>
    );
  }
}
