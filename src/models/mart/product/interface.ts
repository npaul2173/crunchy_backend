interface ProductProps {
    id: String;
    productName: String;
    description?: String;
    price: Number;
    quantity?: Number;
    categoryId: Number;
    images: string[];
}

interface GetProductProps {
    productName: String;
}

export { ProductProps, GetProductProps };
