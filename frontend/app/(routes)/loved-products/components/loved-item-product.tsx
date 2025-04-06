import { ProductCard } from "@/components/product-card";
import { ProductType } from "@/types/product";

interface LovedItemProductProps {
    product: ProductType
}

const LovedItemProduct = (props: LovedItemProductProps) => {
    const { product } = props

    return (
        <div className="w-full flex justify-center py-12 md:py-12">
            <ProductCard key={product.id} result={[product]} loading={false} />
        </div>
    );
}

export default LovedItemProduct;