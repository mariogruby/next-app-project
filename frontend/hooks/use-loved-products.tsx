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