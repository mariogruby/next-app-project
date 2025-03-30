"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types/product";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { Heart } from "lucide-react";
import { useLovedProducts } from "@/hooks/use-loved-products";

type ProductCardProps = {
  loading?: boolean;
  result?: ProductType[];
}
export const ProductCard = (props: ProductCardProps) => {

  const { loading, result } = props;
  const { addItem, removeItem, items } = useCart()
  const { addLoveItem, lovedItems, removeLovedItem } = useLovedProducts()

  const colorMapping: Record<string, string> = {
    grape: "#6D2E46",
    blue: "oklch(0.424 0.199 265.638)",
    yellow: "oklch(0.905 0.182 98.111)",
    black: "oklch(0.141 0.005 285.823)",
    green: "oklch(0.262 0.051 172.552)",
    pink: "oklch(0.525 0.223 3.958)",
    red: "oklch(0.505 0.213 27.518)",
    rose: "oklch(0.81 0.117 11.638)"
  };


  if (loading || !result || result.length === 0) {
    return (
      <motion.div
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
      const isLoved = lovedItems.some(item => item.id === product.id);
      const inCart = items.some(item => item.id === product.id)
      return (
        <motion.div
          key={id}
          whileHover={{ y: -20 }}
          className="group/product max-h-[500px] w-[39vh] md:w-[330px] xl:w-[350px] flex-shrink-0"
        >
          <div className="rounded-[22px] shadow-xl max-w-sm max-h-min p-4 sm:p-10 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-700">
            <Link href={`/product/${slug}`} className="block">
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
              <div className="flex gap-3 my-4 justify-center">
                {product.colors.map((color, index) => {
                  const displayColor = colorMapping[color.toLowerCase()] || color;
                  return (
                    <button
                      key={index}
                      className="w-5 h-5 rounded-full border-2 transition hover:scale-110 relative"
                      style={{
                        backgroundColor: displayColor,
                        boxShadow: "inset 3px 3px 6px rgba(255, 255, 255, 0.3), inset -3px -3px 6px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  );
                })}
              </div>
              <p className="text-base sm:text-xl text-neutral-900 mt-4 mb-2 dark:text-neutral-200">
                {productName}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {product.description.slice(0, 100)}...
              </p>
            </Link>
            <div className="flex">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (inCart) {
                    removeItem(product.id);
                  } else {
                    // to add to cart from the product card(homepage, loved-p etc...), we pass the first color of product, if not existing = undefined
                    const firstColor = product.colors.length > 0 ? product.colors[0] : undefined;
                    addItem(product, firstColor);
                  }
                }}
                icon={<span>{inCart ? "Remove from cart" : "Add to cart"}</span>}
                className="rounded-xl pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-neutral-900 mt-4 text-xs font-bold dark:bg-zinc-800"
              >
                <span className="bg-zinc-700 rounded-lg text-[0.8rem] px-2 py-1 text-white">
                  {formatPrice(price)}
                </span>
              </Button>
              <Heart
                width={30}
                strokeWidth={1}
                className={`transition duration-300 cursor-pointer mt-5 ml-auto ${isLoved ? 'fill-neutral-900 ' : 'hover:fill-neutral-900'}`}
                onClick={() => isLoved ? removeLovedItem(product.id) : addLoveItem(product)}
              />
            </div>
          </div>
        </motion.div>

      );
    })
  );
};