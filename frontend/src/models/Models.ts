export interface MenuCategory {
    name: string;
    dishes: MenuDish[];
}

export interface MenuDish {
    name: string;
    price: number;
}
