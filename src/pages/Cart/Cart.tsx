import CartItem from '../CartItem/CartItem';

import { Wrapper } from './Cart.styles';

import { CartItemType } from '../../types/CartItemType';

import IconButton from '@material-ui/core/IconButton'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

type Props = {
    cartItems: CartItemType[],
    addToCart : (clickedItem :CartItemType) => void,
    removeFromCart : (id:number) => void;
}


const Cart : React.FC<Props> = ({cartItems,addToCart,removeFromCart}) => {
   
    const calculateTotal = (items : CartItemType[]) => 
        items.reduce((acc:number,item) => acc + item.amount * item.price,0)
    
    return (
        <Wrapper>
            <h2>Your Shopping Cart ^^</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map((item) => (
            <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart}
                addToCart={addToCart}/>
            ))}
            {cartItems.length > 0
            ?      
            (<div className='cart__checkout'>
                <h2>Total : ${calculateTotal(cartItems).toFixed(2)}</h2>
                
                <IconButton
                color='secondary'
                size='small'          
                >
                    <AccountBalanceIcon style={{margin:10}}/>
                    CHECKOUT
                </IconButton>
            </div>)
            :null
            }
      
        </Wrapper>
    )
}

export default Cart;