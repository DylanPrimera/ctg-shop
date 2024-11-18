export interface Product {
    id?: string;
    description: string | null;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSize[];
    slug: string;
    tags: string[];
    title: string;
    type?: ValidType;
    gender: ValidGender
}

export type ValidGender = 'men'|'women'|'kid'|'unisex';
export type ValidSize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidType = 'shirts'|'pants'|'hoodies'|'hats';