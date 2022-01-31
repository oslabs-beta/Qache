import { Product } from '../../../interfaces';
import '../../styles/demo-styles/ProductDetails.scss';

const ProductDetails = ({ productData }: { productData: Product[] }) => {
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
