"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types/product";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
// import { useRouter } from "next/navigation";

type ProductCardProps = {
  loading?: boolean;
  result?: ProductType[];
}
export const ProductCard = (props: ProductCardProps) => {

  const { loading, result } = props;
  const { addItem } = useCart()

  // const router = useRouter();
  if (loading || !result || result.length === 0) {
    return (
      <motion.div
        // style={{ x: translate }}
        className="group/product h-[500px] w-[350px] flex-shrink-0"
      >
        <div className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white shadow-2xl dark:bg-zinc-900">
          <Skeleton className="h-[300px] w-[250px]" />
          <Skeleton className="mt-4 mb-2 h-6 w-3/4" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-4 h-8 w-1/2" />
        </div>
      </motion.div>
    );
  }

  return (
    result.map((product: ProductType) => {
      const { id, images, price, productName, slug } = product;
      return (
        <motion.div
          key={id}
          whileHover={{ y: -20 }}
          className="group/product h-[500px] w-[39vh] md:w-[330px] xl:w-[350px] flex-shrink-0"
        >
          <div className="rounded-[22px] shadow-xl max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-700">
            <Link href={`/product/${slug}`} className="block">
              {/* Contenido clickeable que lleva al producto */}
              {images.length > 0 ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`}
                  alt={productName}
                  height={400}
                  width={400}
                  className="object-contain rounded"
                />
              ) : (
                <Skeleton className="h-[300px] w-[250px]" />
              )}
              <p className="text-base sm:text-xl text-neutral-900 mt-4 mb-2 dark:text-neutral-200">
                {productName}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {product.description.slice(0, 100)}...
              </p>
            </Link>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
              icon={<span>Add to cart</span>}
              className="rounded-xl pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-neutral-900 mt-4 text-xs font-bold dark:bg-zinc-800"
            >
              <span className="bg-zinc-700 rounded-lg text-[0.8rem] px-2 py-1 text-white">
                {formatPrice(price)}
              </span>
            </Button>
          </div>
        </motion.div>

      );
    })
  );
};
