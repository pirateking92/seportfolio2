// CarouselClient.tsx - Client Component for Carousel
"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { usePathname } from "next/navigation";

export default function CarouselClient({ initialData }) {
  const pathname = usePathname();

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {initialData.map((page, index) => (
          <CarouselItem key={page.title} className="basis-full">
            <div className="pt-16 p-1 h-[90vh]">
              <Link
                href={`/productions/${encodeURIComponent(
                  page.title.toLowerCase().replace(/\s/g, "-")
                )}`}
                className="block w-full h-full group"
              >
                <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-95">
                  <Image
                    src={page.showInGallery.mainImage.node.sourceUrl}
                    alt={page.title}
                    className={`object-cover rounded-lg ${
                      pathname === "/productions/i-am-lysistrata/"
                        ? "object-[50%_25%]"
                        : ""
                    }`}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                    <div className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {page.title}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
