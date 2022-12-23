interface CustomerProps {
    id: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    isPhoneVerified?: boolean;
    isEmailVerified?: boolean;
}

export { CustomerProps };
