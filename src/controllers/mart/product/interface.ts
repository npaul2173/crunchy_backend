import { ProductProps, GetProductProps } from 'models/mart/product/interface';

type ProductCreateProps = Omit<ProductProps, 'id'>;

export { ProductCreateProps, GetProductProps };
