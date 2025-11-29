import { Card, CardContent } from "@/components/ui/card";
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
import type { Metadata } from "next";
import ImageLightbox from "@/components/ImageLightbox";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ uri: ["wish-you-were-here"] }];
}

export async function generateMetadata(props: {
  params: Promise<{ uri: string[] }>;
}): Promise<Metadata> {
  try {
    const params = await props.params;
    if (!params?.uri || !Array.isArray(params.uri)) {
      return {
        title: "Productions | Sepy Baghaei",
        description: "Production gallery",
      };
    }
    const pageData = await getPageData(params.uri.join("/"));
    return {
      title: `${pageData.pageTitle} | Productions | Sepy Baghaei`,
      description:
        pageData.pageContent.replace(/<[^>]+>/g, "").slice(0, 155) + "...",
      openGraph: {
        images: [{ url: pageData.imageData }],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Productions | Sepy Baghaei",
      description: "Production gallery",
    };
  }
}

const formatTitle = (uri: string) => {
  return uri.split("/").pop()?.replace(/-/g, " ") || uri;
};

const getPageData = async (uri: string) => {
  const formattedTitle = formatTitle(uri);
  try {
    const [pageResult, carouselResult] = await Promise.all([
      client.query({
        query: GET_PAGE_IMAGE_AND_CONTENT,
        variables: { id: uri },
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      }),
      client.query({
        query: GET_PAGE_CAROUSEL_ITEMS,
        variables: { title: formattedTitle },
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      }),
    ]);
    if (!pageResult.data?.page) {
      throw new Error(`No page found for URI: ${uri}`);
    }
    if (!carouselResult.data?.mediaItems?.edges?.length) {
      throw new Error(`No carousel images found for title: ${formattedTitle}`);
    }
    return {
      id: pageResult.data.page.id,
      pageContent: pageResult.data.page.content,
      pageTitle: pageResult.data.page.title,
      uri: pageResult.data.page.uri,
      imageData: pageResult.data.page.showInGallery.mainImage.node.sourceUrl,
      carouselImages: carouselResult.data.mediaItems.edges.map(
        (edge: { node: { sourceUrl: string } }) => edge.node.sourceUrl
      ),
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};

const imageStyles: Record<
  string,
  Record<
    number,
    {
      position?: string;
      cardHeight?: string;
      carouselBasis?: string;
    }
  >
> = {
  "Daytime Deewane": {
    1: {
      position: "object-contain h-auto max-h-full w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    2: {
      position: "object-contain h-auto max-h-full w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    3: {
      position: "object-contain h-auto max-h-full w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    4: {
      position: "object-contain h-[110%] max-h-full w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    7: {
      position: "object-contain h-auto max-h-[90%] w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    8: {
      position: "object-contain h-auto max-h-[90%] w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    9: {
      position: "object-contain h-auto max-h-[90%] w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    10: {
      position: "object-contain h-auto max-h-[90%] w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
    11: {
      position: "object-contain h-auto max-h-[90%] w-auto max-w-full",
      carouselBasis: "basis-auto",
    },
  },
};

export default async function ProductionPage(props: {
  params: Promise<{ uri: string[] }>;
}) {
  try {
    const params = await props.params;
    if (!params?.uri || !Array.isArray(params.uri)) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 text-xl">Invalid page parameters</p>
        </div>
      );
    }
    const pageData = await getPageData(params.uri.join("/"));

    return (
      <div className="relative flex flex-col min-h-screen">
        <main className="flex-grow">
          <SmokeFadeIn visibleOnLoad={false}>
            <Carousel
              opts={{ loop: true }}
              className="w-full h-full pt-24 justify justify-center items-center"
            >
              <CarouselContent className="-ml-1">
                {pageData.carouselImages.map((imageUrl, index) => {
                  const styles = imageStyles[pageData.pageTitle]?.[index];

                  return (
                    <CarouselItem
                      key={index}
                      className={`flex pl-1 items-center justify-center ${
                        styles?.carouselBasis || "md:basis-1/2 lg:basis-1/3"
                      }`}
                    >
                      <ImageLightbox
                        imageUrl={imageUrl}
                        index={index}
                        allImages={pageData.carouselImages}
                      >
                        <Card
                          className={`bg-transparent flex items-center justify-center ${
                            styles?.cardHeight || "h-[400px]"
                          } cursor-pointer transition-transform hover:scale-105`}
                        >
                          <CardContent className="h-full w-full flex items-center justify-center p-0">
                            <div className="h-full w-full flex items-center justify-center">
                              <Image
                                src={imageUrl}
                                alt={`Carousel image ${index + 1}`}
                                height={600}
                                width={600}
                                priority={index === 0}
                                loading={index < 3 ? "eager" : "lazy"}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{
                                  maxHeight: "100%",
                                  maxWidth: "100%",
                                }}
                                className={
                                  styles?.position ||
                                  "object-cover object-center"
                                }
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJHrms6dAiz36ags2mEohd8v/9k="
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </ImageLightbox>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="opacity-40" />
              <CarouselNext className="opacity-40" />
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
    console.error("Production page error:", error);
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
