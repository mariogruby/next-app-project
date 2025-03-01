export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    active: boolean;
    isFeatured: boolean;
    price: number;
    colors: string[];
    model: string;
    images: {
        id: number;
        url: string;
    }[];
    category: {
        id: number;
        categoryName: string;
        slug: string;
    };
};
