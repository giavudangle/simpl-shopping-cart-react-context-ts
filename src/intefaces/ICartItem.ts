import { CartItemType } from "../types/CartItemType";
import { CART_ITEM_CONSTAINTS } from "../types/CartItemType.const"


export interface ICartItemGetProductsRequest{
    type:typeof CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_REQUEST,
    payload: boolean
}

export interface ICartItemGetProductsSuccess {
    type:typeof CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_SUCCESS,
    payload: CartItemType[]
}

export interface ICartItemGetProductsReject {
    type:typeof CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_REJECT,
    payload: string
}



export type ProductDispatchTypes = 
ICartItemGetProductsRequest |
ICartItemGetProductsSuccess |
ICartItemGetProductsReject ;