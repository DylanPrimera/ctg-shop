
export interface Order {
    id:           string;
    subTotal:     number;
    taxes:        number;
    total:        number;
    itemsInOrder: number;
    isPaid:       boolean;
    paidAt:       null;
    createdAt:    Date;
    updatedAt:    Date;
    userId:       string;
    orderAddress: OrderAddress;
}

export interface OrderAddress {
    id:        string;
    firstName: string;
    lastName:  string;
    address1:  string;
    address2:  string;
    zipCode:   string;
    city:      string;
    phone:     string;
    countryId: string;
    orderId:   string;
}


