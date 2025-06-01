// app/layout.tsx
import { Indie_Flower, Alegreya } from "next/font/google";
import "/src/app/globals.css";
import "flowbite/dist/flowbite.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisScrollProvider from "./providers/lenis-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import client from "../../apollo-client";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";

const headingFont = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-headingFont",
  display: "swap",
});

const bodyFont = Alegreya({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-bodyfont",
  display: "swap",
});

export const metadata = {
  title: "Sepy Baghaei",
  description: "Sepy Baghaei, theatre director & playwright based in London",
  icons: {
    icon: "/2.png",
  },
};

async function getFirstImageUrl() {
  try {
    const { data } = await client.query({
      query: GET_PAGE_IMAGE_AND_CONTENT,
      variables: { id: "wish-you-were-here" }, // Your first production
    });

    const imageUrl = data.page?.showInGallery?.mainImage?.node?.sourceUrl;
    if (!imageUrl) return null;

    // Generate srcSet for the image
    const sizes = [640, 750, 828, 1080, 1200, 1920];
    const srcSet = sizes
      .map((size) => {
        const url = new URL(imageUrl);
        // Assuming you're using WordPress, adjust the width parameter
        url.searchParams.set("w", size.toString());
        return `${url.toString()} ${size}w`;
      })
      .join(", ");

    return { url: imageUrl, srcSet };
  } catch (error) {
    console.error("Error fetching first image:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firstImage = await getFirstImageUrl();

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        {firstImage && (
          <link
            rel="preload"
            as="image"
            href={firstImage.url}
            imageSrcSet={firstImage.srcSet}
            sizes="100vw"
          />
        )}
      </head>
      <body className="bg-black-to-navy flex flex-col min-h-screen bg-no-repeat bg-fixed">
        <LenisScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <SpeedInsights />
        </LenisScrollProvider>
      </body>
    </html>
  );
}
