import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { Product, Metric } from '../../interfaces';
import LineGraph from './LineGraph';
import '../styles/LandingPage.scss';

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
    query: `{getProductsBy(category: "${category}") {
      name
      description
      imageUrl
      quantity
      price
      onSale
      category
    }}`,
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
  
  console.log(typeof category, category);
  console.log('Product state: ', productData);
  console.log('Speed ', speed);

  useEffect(() => {
    if (speed > 0) {
      const newMetrics = JSON.parse(JSON.stringify(metrics));
      console.log(newMetrics);
      console.log(category);
      let prevLabel =
        newMetrics[category].labels[newMetrics[category].labels.length - 1];
      if (prevLabel === undefined) prevLabel = 0;
      newMetrics[category].labels.push(String(Number(prevLabel) + 1));
      newMetrics[category].data.push(speed);
      setMetrics(newMetrics);
    }
  }, [speed]);

  return (
    <>
      <h1>{category}</h1>
      {<LineGraph metrics={metrics.Bedroom} />}
    </>
  );
};

export default ProductDisplay;
