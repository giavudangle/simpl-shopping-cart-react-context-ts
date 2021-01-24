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
    const { getListProducts, handleAddToCart, getTotalItems,handleRemoveFromCart } = actions;
    const { data, isLoading, error }: ProductContextType = state;

    // Local state 

    const [cartOpen, setCartOpen] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState([] as CartItemType[])


    useEffect(() => {
        getListProducts()
    }, [])

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
                <Badge badgeContent={3} color='error'>
                    <AddCartIcon/>
                </Badge>
            </StyledButton>



            <Grid container spacing={3}>
                {data?.map((item: CartItemType) => (
                    <Grid xs={12} sm={4} item key={item.id}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default Home;