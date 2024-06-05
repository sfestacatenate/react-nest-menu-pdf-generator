export interface Menu {
    id: number;
    name: string;
    categories: MenuCategory[];
    pdfName?: string;
}

export interface MenuCategory {
    id: number;
    name: string;
    dishes: MenuDish[];
}

export interface MenuDish {
    id: number;
    name: string;
    price: number;
}
