/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface CarouselProductProps {
    images: {
        id: number;
        url: string;
    }[];
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;

    return (
        <div className="sm:px-16">
            <Carousel className="relative">
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.id}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                                alt="image product"
                                className="rounded-lg w-full h-auto"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div
                    className="flex justify-center gap-4 mt-4 sm:absolute sm:inset-x-0 sm:top-1/2 sm:mt-0 sm:transform sm:-translate-y-1/2 sm:flex-row sm:justify-between sm:px-4">
                    <CarouselPrevious className="static sm:relative" />
                    <CarouselNext className="static sm:relative" />
                </div>
            </Carousel>
        </div>
    );
};

export default CarouselProduct;