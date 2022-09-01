// In TypeScript, enums, or enumerated types, are data structures of constant length that hold a set of constant values. 
// Each of these constant values is known as a member of the enum. 
// Enums are useful when setting properties or values that can only be a certain number of possible values.
export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED'
}

export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[]
}

export type CategoryMap = {
    [key: string]: CategoryItem[];
}