import { useRouter } from 'next/navigation';
import Image from "next/image";

interface ProductImageMinProps {
    slug: string
    selectedImage: string
    productName: string
}
const ProductImageMiniature = (props: ProductImageMinProps) => {
    const router = useRouter()
    const { slug, selectedImage, productName } = props

    return (
        <div
            className="w-16 h-16 overflow-hidden rounded-md cursor-pointer"
            onClick={() => router.push(`/product/${slug}`)}
        >
            <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedImage}` || "/placeholder.jpg"}
                alt={productName}
                width={64}
                height={64}
                className="object-cover"
            />
        </div>
    );
}

export default ProductImageMiniature;