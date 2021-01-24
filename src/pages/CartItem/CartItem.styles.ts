import styled from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    font-family:Arial, Helvetica, sans-serif;
    border-bottom: 1px solid blueviolet;
    padding-bottom: 20px;

    div {
        flex:1
    }

    .information, .buttons {
        display:flex;
        justify-content:space-between;

    }

   
    .cart-image {
        display:flex;
        justify-content:center;
        flex-direction:row
    }

    img {
      
        max-width:80px;
        object-fit:cover;


    }

    


`