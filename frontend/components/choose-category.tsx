"use client";

import { useGetCategories } from "@/api/getProducts";
import { ResponseType } from "../types/response";
import { CategoryType } from "../types/category";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const ChooseCategory = () => {
    const { result, loading, error }: ResponseType = useGetCategories();
    const categories: CategoryType[] = result?.data || [];

    const cards = categories.map((category) => {
        const { id, slug, categoryName, mainImage } = category;
        return (
            <Card
                slug={slug}
                key={id}
                card={{
                    title: categoryName,
                    src: `${process.env.NEXT_PUBLIC_BACKEND_URL}${mainImage.url}`,
                }}
            />
        );
    });


    return (

        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-200 font-sans">
                Choose your favorite category
            </h2>
            {categories.length === 0 && !loading && !error && (
                <p>No categories available.</p>
            )}
            <Carousel items={cards} loading={loading} />
        </div>
    );
};

export default ChooseCategory;