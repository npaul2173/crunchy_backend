import { ProductProps } from 'models/product/interface';

type ProductCreateProps = Omit<ProductProps, 'id'>;

export { ProductCreateProps };
