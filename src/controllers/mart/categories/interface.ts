import { CategoryProps } from 'models/mart/category/interface';

type CategoryCreateProps = Omit<CategoryProps, 'id'>;

export { CategoryCreateProps };
