export interface Address {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    zipCode: string;
    city: string;
    country: string;
    phone: number | string;
    remember?: boolean;
}