"use client"

import { useLovedProducts } from "@/hooks/use-loved-products"
import LovedItemProduct from "./components/loved-item-product"

export default function Page() {
    const { lovedItems } = useLovedProducts()
    return (
        <div className="max-w-7xl px-4 py-16 mx-auto sm:py-32 sm:px-24 md:px-6 lg:px-8">
            <h1 className="mb-5 font-bold sm:text-2xl md:text-3xl">
                Loved Products
            </h1>
            <div>
                <div>
                    {lovedItems.length === 0 && (
                        <p>No products added in this section</p>
                    )}
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {lovedItems.map((item) => (
                            <LovedItemProduct key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}