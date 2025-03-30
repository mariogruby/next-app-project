"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ProductCard } from "../product-card";
import { FlipWords } from "./flip-words";
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const HeroParallax = () => {
  const { result, loading }: ResponseType = useGetFeaturedProducts();

  const products = result || [];
  const repeatedProducts = [...products, ...products, ...products].slice(0, 15);

  const firstRow = repeatedProducts.slice(0, 5);
  const secondRow = repeatedProducts.slice(5, 10);

  const skeletonCount = 5;

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };


  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-845, 0]),
    springConfig
  );

  return (
<div
  ref={ref}
  className="min-h-screen py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
>
  <Header />
  <motion.div
    style={{ rotateX, rotateZ, translateY, opacity }}
    className="mx-auto w-full py-4 sm:px-6 lg:px-8 "
  >
    {[firstRow, secondRow].map((row, rowIndex) => (
      <motion.div key={rowIndex}  className="w-full">
        <Carousel opts={{ align: "start"}} className="w-full max-w-7xl mx-auto overflow-visible">
          <CarouselContent className="pb-14 sm:my-12 md:pb-5 mx-5">
            {loading && row.length === 0
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                  <CarouselItem
                    key={`skeleton-${rowIndex}-${index}`}
                    className="py-8 xl:p-0 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3 md:mx-4 xl:mx-2"
                  >
                    <ProductCard key={`skeleton-${rowIndex}-${index}`} loading={true} />
                  </CarouselItem>
                ))
              : row.map((product: ProductType) => (
                  <CarouselItem
                    key={product.id}
                    className="py-8 xl:p-0 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3 md:mx-4 xl:mx-4 xl:py-5"
                  >
                    <ProductCard key={product.id} result={[product]} loading={false} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </motion.div>
    ))}
  </motion.div>
</div>
  );
};

// this is a title presentation concept of landing page 
export const Header = () => {
  const words = ["cases", "accessories", "airpods", "wallets"];
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-neutral-900 dark:text-white">
        None Store <br /> <FlipWords words={words} /> <br />
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-900 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};