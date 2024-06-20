import { IOrderItemRead } from "../Order Items/order-item-read";
import { IOrderRead } from "./order-read";

export interface IOrderHistory {
    orders:IOrderRead[],
    totalPages:number
};

export const initOrderHistory: IOrderHistory = {
    orders:[],
    totalPages:0
};