import { Product } from '../../interfaces';
import '../styles/ProductDetails.scss';

const ProductDetails = ({ productData }: { productData: Product[] }) => {
  return (
    <div className='products-wrap'>
      {productData.map((product) => (
        <div className='product-container'>
          <img src={product.imageUrl} alt={product.name + ' product'} />
          <div className='product-info'>
            <h2>{product.name}</h2>
            {product.quantity ? (
              <span>{product.quantity} in stock</span>
            ) : (
              <span>Out of stock</span>
            )}
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
