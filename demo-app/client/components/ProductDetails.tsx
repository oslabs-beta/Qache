import { Product } from '../../interfaces';
import '../styles/ProductDetails.scss';

const ProductDetails = ({ productData }: { productData: Product[] }) => {
  return (
    <div className='products-wrap'>
      {productData.map((product, key) => (
        <div key={key} className='product-container'>
          <img src={product.imageUrl} alt={product.name + ' product'} />
          <div className='product-info'>
            <h2>{product.name}</h2>
            {product.quantity ? (
              <span><strong>{product.quantity}</strong> in stock</span>
            ) : (
              <strong>Out of stock</strong>
            )}
            <strong>${product.price}</strong>
            <p>{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
