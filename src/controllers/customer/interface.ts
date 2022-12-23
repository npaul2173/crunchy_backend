import { CustomerProps } from 'models/customer/interface';

type CustomerCreateProps = Omit<CustomerProps, 'id'>;

export { CustomerCreateProps };
