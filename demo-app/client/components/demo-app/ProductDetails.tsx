import { Product } from '../../../interfaces';
import '../../styles/demo-styles/ProductDetails.scss';
import axios, { AxiosResponse } from 'axios'

const ProductDetails = ({ productData }: { productData: Product[] }) => {

  /* Add to cart button: when clicked, sends product.id to cart
  which should add that product to the cart for checkout */
  // const addToCart = (product: { inCart: boolean; }) => {
  //   product.inCart = true;
  // }

  // /* Remove from cart button: when clicked, sends product.id to cart
  // which should remove that product from the cart */
  // const removeFromCart = (product: { inCart: boolean; }) => {
  //   product.inCart = false;
  // }
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
            {/* <button onClick={() => {
              let body = {
                query: `mutation {
                  updateProduct (id: ${product.id}, inCart: true) 
                }`
              }
              axios
                .post<Product[]>('http://localhost:3000/graphql', body)
                .then(({data}: AxiosResponse<any>) => {
                  console.log(data)
                })
            }}>Add to cart</button>
            <button onClick={() => {product.inCart = false}}>Remove from cart</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
