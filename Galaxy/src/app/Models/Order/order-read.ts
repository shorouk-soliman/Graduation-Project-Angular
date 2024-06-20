import { IOrderItemRead } from "../Order Items/order-item-read";

export interface IOrderRead {
    id: number,
    shippingDate:number,
    deliverDate:number,
    shippingAddress:string,
    userId:string,
    status:string,
    total:number,
    items:IOrderItemRead[]
};

export const initOrderRead: IOrderRead = {
    id: 0,
    shippingDate:new Date().getUTCDate(),
    deliverDate:new Date().getUTCDate(),
    shippingAddress:'',
    userId:'',
    status:'',
    total:0,
    items:[]
};