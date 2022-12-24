import { CuisineProps } from 'models/cuisine/interface';

type CuisineCreateProps = Omit<CuisineProps, 'id'>;

export { CuisineCreateProps };
