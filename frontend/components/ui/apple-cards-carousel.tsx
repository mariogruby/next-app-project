"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import Link from "next/link";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  loading?: boolean;
}

export const Carousel = ({ items, initialScroll = 0, loading = false }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="relative w-full">
        <div className="flex w-full overflow-x-hidden py-10 md:py-20 scroll-smooth [scrollbar-width:none]">
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={"skeleton-" + index}
                className="cursor-pointer shadow-xl rounded-3xl h-80 w-56 md:h-[40rem] md:w-96"
              >
                <Skeleton className="h-full w-full rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    )
  }
  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" } }}
              key={"card" + index}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50" onClick={scrollLeft} disabled={!canScrollLeft}>
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50" onClick={scrollRight} disabled={!canScrollRight}>
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export const Card = ({
  card,
  slug,
}: {
  slug: string,
  card: {
    src: string;
    title: string
  };
}) => {

  return (
    <Link href={`/category/${slug}`}>
    <motion.div
      whileHover={{ y: -20 }}
      className="cursor-pointer shadow-xl rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10">
      <div
        className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
      <div
        className="relative z-40 p-8">
        <p
          className="text-white text-xl md:text-4xl font-medium font-sans text-left">{card.title.charAt(0).toUpperCase() + card.title.slice(1)}
        </p>
      </div>
      <BlurImage
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute z-10 inset-0" />
    </motion.div>
    </Link>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};


// <motion.div
//   whileHover={{ y: -20 }}
//   className="cursor-pointer shadow-xl rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10">
//   <Skeleton
//     className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
// </motion.div>