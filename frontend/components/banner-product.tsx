"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { ResponseType } from '../types/response';
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ProductType } from "@/types/product";

export default function BannerProduct() {
    const { result, loading, error }: ResponseType = useGetFeaturedProducts();

    const response = result || [];
    // this a product visualized in the banner, hardcoded whit product.productName 
    const selectedProduct = response.find((product: ProductType) => product.productName === "Case iphone 16");

    const imageUrl = selectedProduct?.images?.[0]?.url
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedProduct.images[0].url}`
        : "/placeholder-image.jpg";

    return (
        <Link href={`/product/${selectedProduct?.slug}`} className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-neutral-900 dark:text-white">
                            Best selling product <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none  text-neutral-900 ">
                                {selectedProduct?.productName}
                            </span>
                        </h1>
                    </>
                }
            >
                <Image
                    src={imageUrl}
                    alt={selectedProduct?.productName || "Product Image"}
                    height={720}
                    width={400}
                    className="mx-auto rounded-2xl object-cover h-full"
                    draggable={false}
                />
            </ContainerScroll>
            {loading && !result && (
                <p>Loading product...</p>
            )}

            {error && !loading && (
                <p>Error match</p>
            )}
        </Link>
    );
}
