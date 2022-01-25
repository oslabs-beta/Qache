import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { Product, Metric } from '../../interfaces';
import ProductDetails from './ProductDetails';
import LineGraph from './LineGraph';
import '../styles/ProductDisplay.scss';

const ProductDisplay = ({ props }: { props: any }) => {
  const {
    category,
    setMetrics,
    metrics,
  }: {
    category: string;
    setMetrics: React.Dispatch<React.SetStateAction<Metric>>;
    metrics: Metric;
  } = props;
  const [productData, setProductData] = useState<Product[]>([]);
  const [speed, setSpeed] = useState(0);

  const body = {
    query: `
    {
      getProductsBy(category: "${category}") {
        name
        description
        imageUrl
        quantity
        price
        onSale
        category
      }
    }`,
  };

  const images = {
    Bedroom:
      'https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0382427_ph100120_s5.jpg?f=xl',
  };

  useEffect(() => {
    const t1: number = Date.now(); // time before axios post starts
    axios
      .post<Product[]>('http://localhost:3000/graphql', body)
      .then(({ data }: AxiosResponse<any>) => {
        const t2: number = Date.now();
        console.log('Query response: ', data.data.getProductsBy); // array of products
        setSpeed(t2 - t1);
        setProductData(data.data.getProductsBy);
        console.log(t2 - t1, 'ms'); // time after axios post finished
      });
  }, []);

  console.log('Product state: ', productData);
  console.log('Speed ', speed);

  useEffect(() => {
    if (speed > 0) {
      const newMetrics = { ...metrics };
      console.log('newMetrics', newMetrics);
      let prevLabel =
        newMetrics[category].labels[newMetrics[category].labels.length - 1];
      if (prevLabel === undefined) prevLabel = '0';
      newMetrics[category].labels.push(String(Number(prevLabel) + 1));
      newMetrics[category].data.push(speed);
      setMetrics(newMetrics);
    }
  }, [speed]);

  return (
    <div className='productDisplay-container'>
      <h1>{category}</h1>
      <div className='cache-line'>
        <img src={images.Bedroom} />
        <LineGraph metrics={metrics.Bedroom} width={500} height={500} />
      </div>
      {productData ? (
        <ProductDetails productData={productData} />
      ) : (
        <span>No items found</span>
      )}
    </div>
  );
};

export default ProductDisplay;
