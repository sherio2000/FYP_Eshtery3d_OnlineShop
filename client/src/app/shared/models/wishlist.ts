import {v4 as uuidv4} from 'uuid';

export interface IWishlist {
    id: string;
    items: IWishlistItem[];
}

export interface IWishlistItem {
    id: number;
    productName: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Wishlist implements IWishlist {
    id = uuidv4();
    items: IWishlistItem[] = [];

}

