"use client"
import { useState, useEffect } from "react"
import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import { Separator } from "@/components/ui/separator"
import { ResponseType } from "@/types/response"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import FiltersControlsCategory from "./components/filters-controls-category"
import { ProductCard } from "@/components/product-card"
import { ProductType } from "@/types/product"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Page() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()

    const skeletonCount = 5;

    const { categorySlug } = params
    const categorySlugString = categorySlug as string
    const { result, loading, error }: ResponseType = useGetCategoryProduct(categorySlugString)

    // learn filter w url params
    const filterFromUrl = searchParams.get("model") || ""
    const [filterModel, setFilterModel] = useState(filterFromUrl)

    useEffect(() => {
        // when filter change, update the url without scroll
        const newParams = new URLSearchParams(searchParams.toString())
        if (filterModel) {
            newParams.set("model", filterModel)
        } else {
            newParams.delete("model")
        }
        router.push(`?${newParams.toString()}`, { scroll: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterModel])

    const filteredProducts = result != null && !loading
        ? filterModel === ""
            ? result
            : result.filter((product: ProductType) => product.model === filterModel)
        : []

    return (
        <div className="max-w-full py-4 mx-auto sm:py-16 sm:px-24">
            {result != null && !loading && (
                <h1 className="text-3xl text-neutral-900 font-medium">{result[0].category.categoryName}</h1>
            )}
            <Separator />

            <div className="sm:flex sm:justify-center md:justify-center xl:justify-center">
                <FiltersControlsCategory setFilterModel={setFilterModel} />

                <div className="flex">
                    {[filteredProducts].map((row, rowIndex) => (
                        <div key={rowIndex} className="w-full relative">
                            <Carousel opts={{ align: "start" }} className="w-full md:max-w-xl lg:max-w-3xl xl:max-w-6xl mx-auto overflow-visible">
                                <CarouselContent className="pb-14 sm:my-12 md:gap-10 md:pb xl:gap-0 xl:pb mx-5">
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
                                                className="py-8 xl:p-0 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3 md:mx-4 xl:mx-2"
                                            >
                                                <ProductCard key={product.id} result={[product]} loading={false} />
                                            </CarouselItem>
                                        ))}
                                </CarouselContent>
                                <div className="sm:hidden flex justify-center absolute bottom-0 left-0 right-0">
                                    <CarouselPrevious className="relative left-auto right-auto transform-none mx-2" />
                                    <CarouselNext className="relative left-auto right-auto transform-none mx-2" />
                                </div>
                                <CarouselPrevious className="hidden sm:flex" />
                                <CarouselNext className="hidden sm:flex" />
                            </Carousel>
                        </div>
                    ))}

                    {filteredProducts != null && !loading && filteredProducts.length === 0 && (
                        <p>No products here</p>
                    )}

                    {error && !loading && (
                        <p>Error match</p>
                    )}
                </div>
            </div>
        </div>
    )
}