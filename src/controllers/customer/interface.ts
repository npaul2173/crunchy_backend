import { CustomerProps } from 'models/customer/interface';

type CustomerCreateProps = Pick<
    CustomerProps,
    'phone' | 'isEmailVerified' | 'isPhoneVerified'
> & {
    otp: string;
};

export { CustomerCreateProps };
