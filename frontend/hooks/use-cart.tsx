import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from '../types/product';
import { toast } from 'sonner';

interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType, selectedColor?: string) => void
    removeItem: (id: number) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType, selectedColor?: string) => {
        const currentItems = get().items
        set({
            items: [...currentItems, { ...data, selectedColor }] 
        })
        toast.success("Product added to cart")
    },
    removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id != id)] })
        toast.warning("Product removed from cart")
    },
    removeAll: () => set({ items: [] }) // this set is called only in /success after checkout successfully 
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))  
// all products are stored in local storage because this is a basic web app for demonstrate skills in next and ts, so, its more faster and in future versions the products saved in the cart will be saved in db 