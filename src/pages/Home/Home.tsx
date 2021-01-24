import { useQuery } from 'react-query';

// UI Material Components

import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'


// Styles
import { Wrapper, StyledButton } from './Home.styles'
import { useContext, useEffect, useState } from 'react';


import { Context as ProductContext, ProductContextType } from '../../contexts/ProductContext'

import Item from '../Item/Item'

import { CartItemType } from '../../types/CartItemType';
import Cart from '../Cart/Cart';

import Button from '@material-ui/core/Button'


const Home: React.FC = () => {
    // Destructuing
    const props = useContext(ProductContext);
    const { actions, state } = props;
    const { getListProducts } = actions;
    const { data, isLoading, error }: ProductContextType = state;

    // Local state 

    const [cartOpen, setCartOpen] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState([] as CartItemType[])


    useEffect(() => {
        getListProducts()
    }, [])

    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            /**
             *  Case 1 : If the item already added in the cart 
             *  => We only increase amount
             *  Case 2 : If the item havent add in the cart
             *  => We must add item and amount
             */

            // Case 1
            const isItemInCart = prev.find(item => item.id === clickedItem.id);
            if(isItemInCart){
                return prev.map(item => (
                    item.id === clickedItem.id
                    ? {...item,amount: item.amount + 1}
                    : item
                ))
            }

            // Case 2
            return [...prev, {...clickedItem,amount:1}]
        })
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => (
            prev.reduce((acc,item) => {
                if(item.id === id){
                    if(item.amount === 1) return acc;
                    return [...acc,{...item,amount : item.amount - 1}]
                }
                else {
                    return [...acc,item];
                }
            },[] as CartItemType[])
        ))
    };


    if (isLoading) return <LinearProgress />
    if (error) return <div>Something went wrong ... </div>



    return (
        <Wrapper>
            <Drawer
                anchor='left'
                open={cartOpen}
                onClose={() => setCartOpen(!cartOpen)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(!cartOpen)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddCartIcon fontSize='large' />
                </Badge>
            </StyledButton>
            <Grid container spacing={4}>
                {data?.map((item: CartItemType) => (
                    <Grid xs={12} sm={2} item key={item.id}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default Home;