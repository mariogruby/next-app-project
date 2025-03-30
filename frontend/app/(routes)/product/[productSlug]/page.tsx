"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"
import { useState, useEffect } from "react"

type ImageType = {
    name: string;
};

export default function Page() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const { productSlug } = params

    const { result, loading, error }: ResponseType = useGetProductBySlug(productSlug) // TODO: fix warning productSlug!!!
    const [selectedColor, setSelectedColor] = useState<string | null>(searchParams.get('color') || null)

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams.toString())
        if (selectedColor) {
            newParams.set("color", selectedColor.toLowerCase())
        } else {
            newParams.delete("color")
        }
        router.push(`?${newParams.toString()}`, { scroll: false })
    }, [selectedColor, searchParams, router])

    if (result == null) {
        return <SkeletonProduct />
    }

    const filteredImages = selectedColor
        ? result[0].images.filter((image: ImageType) =>
            image.name.toLowerCase().includes(selectedColor.toLowerCase())
        )
        : result[0].images;

    return (
        <div className="max-w-full py-4 mx-auto sm:py-32 lg:px-24">
            <div className="grid sm:grid-cols-2">
                <div>
                    <CarouselProduct images={filteredImages} />
                </div>

                <div className="sm:px-12">
                    <InfoProduct
                        product={result[0]}
                        onColorSelect={(color) => setSelectedColor(color)}
                    />
                </div>
            </div>
        </div>
    )
}