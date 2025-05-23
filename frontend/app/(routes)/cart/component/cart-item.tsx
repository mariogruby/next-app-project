import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { Trash2 } from "lucide-react";
import { formatPrice } from '../../../../lib/formatPrice';
import ProductImageMiniature from "@/components/shared/product-image-miniature";

interface CartItemProps {
    product: ProductType;
}

const CartItem = ({ product }: CartItemProps) => {
    const { removeItem } = useCart();

    // search corresponding image with the color selected (if existing color)
    const selectedImage =
        product.images.find((image) =>
            product.selectedColor
                ? image.url.toLowerCase().includes(product.selectedColor.toLowerCase())
                : false
        ) || product.images[0]; // if not coincidence, fallback to first image

    return (
        <li className="flex items-center py-4 border-b">
            <ProductImageMiniature
                slug={product.slug}
                selectedImage={selectedImage.url}
                productName={product.productName}
            />
            <div className="ml-4 flex-1">
                <p className="text-lg font-medium">{product.productName}</p>
                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
            </div>

            <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeItem(product.id)}
            >
                <Trash2 width={60} strokeWidth={1} />
            </button>
        </li>
    );
};

export default CartItem;