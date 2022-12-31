import { CategoryProps } from 'models/category/interface';

type CategoryCreateProps = Omit<CategoryProps, 'id'>;

export { CategoryCreateProps };
