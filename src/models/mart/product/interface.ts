interface ProductProps {
    id: String;
    productName: String;
    descriptiion?: String;
    price: Number;
    quantity?: Number;
    categoryId: Number;
    images: string[];
}

interface GetProductProps {
    productName: String;
}

export { ProductProps, GetProductProps };
