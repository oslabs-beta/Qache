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
  const [productCategory, setProductCategory] = useState("");

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

  useEffect(() => {
    if (category === 'Appliances') setProductCategory(images.Appliances);
    if (category === 'Bathroom') setProductCategory(images.Bathroom);
    if (category === 'Bedroom') setProductCategory(images.Bedroom); 
    if (category === 'Couches') setProductCategory(images.Couches);
    if (category === 'Furniture') setProductCategory(images.Furniture);
    if (category === 'Kitchen') setProductCategory(images.Kitchen);
    if (category === 'Living Room') setProductCategory(images.LivingRoom);
    if (category === 'Mattresses') setProductCategory(images.Mattresses);
    if (category === 'Storage') setProductCategory(images.Storage);
  }, [category]);

  const images = {
    "Appliances": 'https://www.ikea.com/ext/ingkadam/m/2dfd300945eee2a1/original/PH174849-crop001.jpg?f=xl',
    "Bathroom": 'https://www.ikea.com/ext/ingkadam/m/6594abb0e040ea4a/original/PH172455-crop001.jpg?f=xl',
    "Bedroom": 'https://www.ikea.com/ext/ingkadam/m/2ba55c1b7b299161/original/PH183297-crop001.jpg?f=xl',
    "Couches": 'https://www.ikea.com/ext/ingkadam/m/7bdf5ea5adddffed/original/PE833223-crop002.jpg?f=xl',
    "Furniture": 'https://www.ikea.com/images/paerup-series-e2badb03ddfba7881a1484dac6b39cc5.jpg?f=s',
    "Kitchen": 'https://www.ikea.com/ext/ingkadam/m/64edbbd36641ef7f/original/PH168793-crop001.jpg?f=m',
    "LivingRoom": 'https://www.ikea.com/images/a-3-seat-sofa-with-chaise-lounge-a-shelving-unit-with-doors--04d392ffcd855db85a5373f188230c66.jpg',
    "Mattresses": 'https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0382427_ph100120_s5.jpg?f=xl',
    "Storage": 'https://www.ikea.com/ext/ingkadam/m/4ed152760bdcc582/original/PH180604.jpg?f=xl',
  };

  useEffect(() => {
    const t1: number = Date.now(); // time before axios post starts
    axios
      .post<Product[]>('http://localhost:3000/graphql', body)
      .then(({ data }: AxiosResponse<any>) => {
        const t2: number = Date.now();
        setSpeed(t2 - t1);
        setProductData(data.data.getProductsBy);
        console.log(t2 - t1, 'ms'); // time after axios post finished
      });
  }, [category]);

  useEffect(() => {
    if (speed > 0) {
      const newMetrics = { ...metrics };
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
        <div>
        <img src={productCategory} alt={category + ' picture'}/>
        </div>
        <LineGraph metrics={metrics[category]} width={500} height={500} />
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
