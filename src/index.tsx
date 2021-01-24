import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider as ProductProvider } from './contexts/ProductContext';


ReactDOM.render(
    <ProductProvider>
        <App />
    </ProductProvider>

    ,
    document.querySelector('#root')
)