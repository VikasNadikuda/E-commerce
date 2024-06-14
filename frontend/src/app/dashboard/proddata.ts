export class Products {
    public id: string;
    public pName: string;
    public pDescription: string;
    public pRating: number;
    public pCategory: string;
    public price: number;
    public color: string;
    public image: string;
    public pSeller: {
        sid: string,
        pDiscount: number,
        pQuantity: number,
        pShippingCharges: number,
    };
}
