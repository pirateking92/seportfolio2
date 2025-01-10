// components/ProductionCarousel.tsx
"use client";

import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Image from "next/image";

interface ProductionCarouselProps {
  images: string[];
}

export function ProductionCarousel({ images }: ProductionCarouselProps) {
  return (
    <Carousel
      opts={{ loop: true }}
      className="w-full h-full pt-24 justify-center items-center"
    >
      <CarouselContent className="-ml-1">
        {images.map((imageUrl, index) => (
          <CarouselItem
            key={index}
            className="flex pl-1 md:basis-1/2 lg:basis-1/3 items-center justify-center"
          >
            <Card className="h-[400px] bg-transparent flex items-center justify-center">
              <CardContent className="h-full w-full flex items-center justify-center p-0">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    alt={`Production image ${index + 1}`}
                    height={600}
                    width={600}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="opacity-40 hover:opacity-100 transition-opacity" />
      <CarouselNext className="opacity-40 hover:opacity-100 transition-opacity" />
    </Carousel>
  );
}
