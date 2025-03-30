import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductType } from '@/types/product';
import { toast } from 'sonner';

interface UseLovedProductsType {
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void
    removeLovedItem: (id: number) => void
}

export const useLovedProducts = create(persist<UseLovedProductsType>((set, get) => ({
    lovedItems: [],
    addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item.id === data.id)
        if (existingItem) {
            return toast.error("The product already exists in loved products")
        }
        set({
            lovedItems: [...get().lovedItems, data]
        })
        toast.success("item added to loved products")
    },
    removeLovedItem: (id: number) => {
        set({ lovedItems: [...get().lovedItems.filter((item) => item.id != id)] })
        toast.warning("item has been remove of the loved products")
    }
}), {
    name: "loved-products-storage",
    storage: createJSONStorage(() => localStorage)
}))