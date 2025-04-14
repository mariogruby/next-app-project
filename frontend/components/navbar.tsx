"use client"

import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
// import { ToggleTheme } from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const Navbar = () => {
    const router = useRouter();
    const cart = useCart();
    const { lovedItems } = useLovedProducts()

    return (
        <div className="sticky top-0 z-50 bg-white flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl md:rounded-xl">
            <h1 className="text-3xl" onClick={() => router.push("/")}>E-
                <span className="font-bold">Store</span>
            </h1>

            {/* menu */}
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>

            {/* mobile menu  */}
            <div className="flex items-center gap-3 sm:hidden">
                <ItemsMenuMobile />
                <Heart
                    strokeWidth="1"
                    className="cursor-pointer"
                    onClick={() => router.push("/loved-products")}
                />
                <ShoppingCart
                    strokeWidth="1"
                    className="cursor-pointer"
                    onClick={() => router.push("/cart")}
                />
                <User strokeWidth="1" className="cursor-pointer" />
            </div>

            {/* desktop icons */}
            <div className="hidden sm:flex items-center justify-between gap-7">
                {cart.items.length == 0 ? (
                    <ShoppingCart
                        strokeWidth="1"
                        className="cursor-pointer"
                        onClick={() => router.push("/cart")}
                    />
                ) : (
                    <div className="flex gap-1" onClick={() => router.push("/cart")}>
                        <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                        <span>{cart.items.length}</span>
                    </div>
                )}
                {lovedItems.length == 0 ? (
                    <Heart
                        strokeWidth="1"
                        className="cursor-pointer"
                        onClick={() => router.push("/loved-products")}
                    />
                ) : (
                    <div className="flex gap-1" onClick={() => router.push("/loved-products")}>
                        <Heart strokeWidth={1} className="cursor-pointer" />
                        <span>{lovedItems.length}</span>
                    </div>
                )}
                <User strokeWidth="1" className="cursor-pointer" />
            </div>
        </div>

    );
};

export default Navbar;

