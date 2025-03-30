import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

export type InfoProductProps = {
    product: ProductType;
    onColorSelect: (color: string) => void;
};

const colorMapping: Record<string, string> = {
    grape: "#6D2E46",
    blue: "oklch(0.424 0.199 265.638)",
    yellow: "oklch(0.905 0.182 98.111)",
    black: "oklch(0.141 0.005 285.823)",
    green: "oklch(0.262 0.051 172.552)",
    pink: "oklch(0.525 0.223 3.958)",
    red: "oklch(0.505 0.213 27.518)",
    rose: "oklch(0.81 0.117 11.638)"
};

const InfoProduct = (props: InfoProductProps) => {
    const { product, onColorSelect } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const { addItem, removeItem, items } = useCart();
    const { addLoveItem, lovedItems, removeLovedItem } = useLovedProducts();
    const isLoved = lovedItems.some(item => item.id === product.id);
    const inCart = items.some(item => item.id === product.id);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        onColorSelect(color);
    };

    // product description truncate
    const truncatedDescription = product.description.length > 100
        ? product.description.substring(0, 200) + "..."
        : product.description;

    return (
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl text-neutral-900">{product.productName}</h1>
                <div className="flex items-center justify-between gap-3" />
            </div>
            <Separator className="my-4" />
            <p className="text-neutral-900">
                {isExpanded ? product.description : truncatedDescription}
                {product.description.length > 100 && (
                    <span
                        className="text-blue-500 cursor-pointer ml-2"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Show Less" : "Learn More"}
                    </span>
                )}
            </p>
            <Separator className="my-4" />

            {product.colors && product.colors.length > 0 && (
                <div className="my-4">
                    <p className="mb-2 font-semibold text-neutral-900">{selectedColor ? "Colors:" : "Select a color to add it to your cart or purchase it:"}</p>
                    <div className="flex gap-3">
                        {product.colors.map((color, index) => {
                            const displayColor = colorMapping[color.toLowerCase()] || color;
                            const isSelected = selectedColor === color;
                            return (
                                <button
                                    key={index}
                                    className={`w-10 h-10 rounded-full border-2 transition hover:scale-110 relative ${isSelected ? 'border-black' : 'border-gray-300'}`}
                                    style={{
                                        backgroundColor: displayColor,
                                        boxShadow: "inset 3px 3px 6px rgba(255, 255, 255, 0.3), inset -3px -3px 6px rgba(0, 0, 0, 0.2)"
                                    }}
                                    onClick={() => handleColorSelect(color)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            <Separator className="my-4" />
            <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-5">
                <Button
                    className="h-[50px] w-full justify-center my-5"
                    onClick={() =>
                        inCart
                            ? removeItem(product.id)
                            : addItem({ ...product, selectedColor }, selectedColor)
                    }
                    disabled={!selectedColor && !inCart}
                >
                    {inCart ? "Remove from cart" : "Add to cart"}
                </Button>

                <Button
                    className="h-[50px] w-full justify-center"
                    onClick={() => console.log("Buy now")}
                    disabled={!selectedColor && !inCart}
                >
                    Buy now
                </Button>
                <Heart
                    width={60}
                    strokeWidth={1}
                    className={`transition duration-300 cursor-pointer ${isLoved ? 'fill-neutral-900' : 'hover:fill-neutral-900'}`}
                    onClick={() => isLoved ? removeLovedItem(product.id) : addLoveItem(product)}
                />
            </div>
        </div>
    );
};

export default InfoProduct;