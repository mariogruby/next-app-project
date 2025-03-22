import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { formatPrice } from '../../../../lib/formatPrice';

interface CartItemProps {
    product: ProductType;
}

const CartItem = ({ product }: CartItemProps) => {
    const router = useRouter();
    const { removeItem } = useCart();

    return (
        <li className="flex items-center py-4 border-b">
            {/* Imagen en miniatura */}
            <div 
                className="w-16 h-16 overflow-hidden rounded-md cursor-pointer"
                onClick={() => router.push(`/product/${product.slug}`)}
            >
                <Image 
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}` || "/placeholder.jpg"} 
                    alt={product.productName} 
                    width={64} 
                    height={64} 
                    className="object-cover"
                />
            </div>

            {/* Nombre y precio del producto */}
            <div className="ml-4 flex-1">
                <p className="text-lg font-medium">{product.productName}</p>
                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
            </div>

            {/* Botón para eliminar */}
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
