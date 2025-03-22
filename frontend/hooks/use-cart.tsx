import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from '../types/product';
import { toast } from 'sonner';

interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void
    removeItem: (id: number) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id == data.id)

        if (existingItem) {
            return toast.error("The product already exists in the cart")
        }

        set({
            items: [...get().items, data]
        })
        toast.success("Product added to cart")
    },
    removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id != id)] })
        toast.warning("Product removed from cart")
    },
    removeAll: () => set({ items: [] })
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))