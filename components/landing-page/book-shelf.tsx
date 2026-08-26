"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./book-card";
import { Book } from "@/data/booksData";
import Link from "next/link";
import type { CarouselApi } from "@/components/ui/carousel";

type Props = {
  books: Book[];
};

const BookShelf = ({ books }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.scrollTo(0);
  }, [books, api]);

  return (
    <Carousel
      className="w-full"
      dir="rtl"
      setApi={setApi}
      opts={{
        direction: "rtl",
        dragFree: true,
      }}
    >
      <CarouselContent className="px-2 gap-5">
        {books.map(({ id, coverImage, isAvailable, label }, index) => (
          <CarouselItem key={index} className="h-full my-2 basis-[43%] sm:basis-[22%]">
            <Link href={`/study/${id}/${1}`}>
              <BookCard coverImage={coverImage} isAvailable={isAvailable} title={label} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-end gap-2 mt-4">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
};

export default BookShelf;
