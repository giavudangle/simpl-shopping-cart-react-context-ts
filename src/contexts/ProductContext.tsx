import { ProductDispatchTypes } from '../intefaces/ICartItem';
import { CART_ITEM_CONSTAINTS } from '../types/CartItemType.const'
import { CartItemType } from '../types/CartItemType';
import fakeStore from '../api/fakeStore';
import { Dispatch } from 'react';
import FactoryContext from './FactoryContext';




export type ProductContextType = {
    data: CartItemType[],
    isLoading: boolean,
    error: string,
}


const initialState: ProductContextType = {
    data: [],
    isLoading: false,
    error: '',
} 


const productReducer = (state: ProductContextType = initialState, action: ProductDispatchTypes): ProductContextType => {
    switch (action.type) {
        case CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_REQUEST:
            return { ...state, isLoading: action.payload, error: '' }
        case CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_SUCCESS:
            return { ...state, data: action.payload, isLoading: false, error: '' }
        case CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_REJECT:
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state;
    }
}

/** @summary getListProduct() return list products get from api (in success case)
 * @param dispatch implement ProductDispatchTypes
 * => Dipatch implment inteface ProductDispatchTypes 
 * => Dispatch in this case is call an Object (Action Creator)
 * => Has no call signatures 
 * => Inject params of dispatch react to invoke
 */
const getListProducts = (dispatch: Dispatch<ProductDispatchTypes>) => {
    return async (): Promise<void> => {
        dispatch({
            type: CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_REQUEST,
            payload: true
        })
        try {
            const response = await fakeStore.get('/products');
            dispatch({
                type: CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_SUCCESS,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: CART_ITEM_CONSTAINTS.GET_LIST_PRODUCTS_REJECT,
                payload: 'Something went wrong -> '
            })
        }
    }
}


const getTotalItems = () => null;


const handleAddToCart = () => null;

const handleRemoveFromCart = () => null;





export const { Context, Provider } = FactoryContext(
    productReducer,
    { getListProducts,handleAddToCart,handleRemoveFromCart },
    []
);