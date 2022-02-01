import {useState, useEffect} from 'react';
import {Product} from '../../../interfaces';
import ProductDetails from './ProductDetails'
import axios, { AxiosResponse } from 'axios';

const Cart = ({props}: {props: any}) => {
    const [cartStorage, setCartStorage] = useState<Product[]>([]);
    const {id} : {id: string} = props;
    let body = {
        query: `
        {
            getProductsBy(category: "Mattresses") {
                name
                description
                imageURL
                quantity
                price
                onSale
                category
            }
        }`
    }
    useEffect(() => {
        // if new product added to the cart, that product's id gets passed into Cart through props
        // check cache for that id's product, and add that product to cartStorage in state
        axios
          .post<Product[]>('http://localhost:3000/graphql', body)
          .then(({data}: AxiosResponse<any>) => {
              console.log("this is response data", data)
              setCartStorage(data.data.getProductsBy)
          })
    }, [])
    return (
        <>
          <p>Here is your cart!</p>
          <div className='cart-display'>
              <ProductDetails productData={cartStorage}/>
          </div>
        </>
    )
}

export default Cart;