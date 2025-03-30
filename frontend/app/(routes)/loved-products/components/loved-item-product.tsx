import { ProductCard } from "@/components/product-card";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";

interface LovedItemProductProps {
    product: ProductType
}

const LovedItemProduct = (props: LovedItemProductProps) => {
    const { product } = props
    const router = useRouter()
    const removeLovedItem = useLovedProducts()
    const { addItem } = useCart()

    return (
        <div className="w-full flex justify-center py-12 md:py-12" onClick={() => router.push(`/product/${product.slug}`)}>
            <ProductCard key={product.id} result={[product]} loading={false} />
        </div>
    );
}

export default LovedItemProduct;