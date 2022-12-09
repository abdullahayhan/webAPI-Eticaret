import { v4 as uuid } from 'uuid';

export interface IBasketItem{
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket{
    id: string;
    items:IBasketItem[];
}



export class Basket implements IBasket{
   
    id : string = uuid();
    items: IBasketItem[];

}