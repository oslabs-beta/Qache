import { Product, AddButton, RemoveButton } from '../../../interfaces';
import '../../styles/demo-styles/ProductDetails.scss';
import axios, { AxiosResponse } from 'axios';
import {useState, useEffect, useRef, useLayoutEffect} from 'react';
// import AddToCart from './Buttons';
// import RemoveFromCart from './Buttons';
import * as React from 'react';


// const AddToCart = ({props} : {props: AddButton}) => {
class AddToCart extends React.Component <AddButton> {
  render() {
  return (
      <button onClick={this.props.onClick}>
          Add item to cart
      </button>
  )
  }
}

class RemoveFromCart extends React.Component <RemoveButton> {
  render() {
  return (
      <button onClick={this.props.onClick}>
          Remove item from cart
      </button>
  )
  }
}

const ProductDetails = ({ productData }: { productData: Product[] }) => {
  const firstUpdate = useRef(true);
  const [clickedButton, setClickedButton] = useState<string>();
  const [addOrRemove, setAddOrRemove] = useState<boolean>();
  const addItem = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    setClickedButton(product.id);
  }
  /* Add to or remove from cart hook: when clicked, sends product.id to cart
  which should add/remove that product to the cart for checkout */
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const body = {
      query: `{
        mutation {
          updateProduct (product: {
            id: "${clickedButton}"
            inCart: ${addOrRemove}
          }) {
            name
            description
            imageUrl
            quantity
            price
            onSale
            id
          }
        }
      }`
    }
    axios
      .post('http://localhost:3000/graphql', body)
      .then(res => console.log('this is res', res))
  }, [clickedButton])
  // /* Remove from cart button: when clicked, sends product.id to cart
  // which should remove that product from the cart */
  
  return (
    <div className='products-wrap'>
      {productData.map((product, key) => (
        <div key={key} className='product-container'>
          {product.onSale ? (
            <>
              <span className='sale'>
                <strong>50% OFF</strong>
              </span>
              <img src={product.imageUrl} alt={product.name + ' product'} />
            </>
          ) : (
            <>
              <img src={product.imageUrl} alt={product.name + ' product'} />
            </>
          )}
          <div className='product-info'>
            <h2>{product.name}</h2>
            {product.onSale ? (
              <span>
                <strong>$</strong>
                <strong>
                  <span className='onSale'>{product.price.toFixed(2)}</span>
                </strong>

                <strong className='newPrice'> $</strong>
                <strong>
                  <span className='newPrice'>
                    {(Math.floor((product.price / 2) * 100) / 100).toFixed(2)}
                  </span>
                </strong>
              </span>
            ) : (
              <strong className='noSale'>
                <span>$</span>
                {product.price.toFixed(2)}
              </strong>
            )}
            {product.quantity ? (
              <span>{product.quantity} in stock</span>
            ) : (
              <strong>Out of stock</strong>
            )}
            <p>{product.description}</p>
            {/* <button onClick={(e) => {
              addItem(e, product);
              }}>Add to cart</button> */}
            <AddToCart onClick={(e) => {
              setAddOrRemove(true)
              addItem(e, product)
              }}></AddToCart>
            <RemoveFromCart onClick={(e) => {
              setAddOrRemove(false)
              addItem(e, product)
              }}></RemoveFromCart>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;