interface ProductProps {
    id: String;
    productName: String;
    descriptiion?: String;
    price: Number;
    quantity?: Number;
    categoryId: Number;
    images: string[];
}

export { ProductProps };
