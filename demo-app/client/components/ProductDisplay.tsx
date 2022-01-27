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
    refresh,
  }: {
    category: string;
    setMetrics: React.Dispatch<React.SetStateAction<Metric>>;
    metrics: Metric;
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  } = props;
  const [productData, setProductData] = useState<Product[]>([]);
  const [speed, setSpeed] = useState<number[]>([]);

  let body = {
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
    if (category === 'Deals') {
      body = {
        query: `{
          filterProductsBy(filter: {
            onSale: true
          }) {
            name
            description
            imageUrl
            quantity
            price
            onSale
          }
        }`,
      };
    }
    const t1 = Date.now(); // time before axios post starts
    axios
      .post<Product[]>('http://localhost:3000/graphql', body)
      .then(({ data }: AxiosResponse<any>) => {
        const t2 = Date.now();
        setSpeed([...speed, t2 - t1]);
        if (data.data.getProductsBy) setProductData(data.data.getProductsBy);
        else if (data.data.filterProductsBy)
          setProductData(data.data.filterProductsBy);
        console.log(category, t2 - t1, 'ms'); // time after axios post finished
      });
  }, [category, refresh]);

  useEffect(() => {
    if (speed.length) {
      const newMetrics = { ...metrics };
      let prevLabel =
        newMetrics[category].labels[newMetrics[category].labels.length - 1];
      if (!prevLabel) prevLabel = '0';
      newMetrics[category].labels.push(String(Number(prevLabel) + 1));
      newMetrics[category].data.push(speed[speed.length - 1]);
      setMetrics(newMetrics);
    }
  }, [speed]);

  return (
    <div className='productDisplay-container'>
      <div className='cache-line'>
        <div className='lineGraphContainer'>
          <strong className='yLabel'>Server Latency</strong>
          <strong className='xLabel'>Fetches</strong>
          <strong className='title'>Cache Speed for {category}</strong>
          <LineGraph metrics={metrics[category]} width={1000} height={500} />
        </div>
        <div className='talkingPoints'>
          This Chart represents the <em>latency</em> to the server, where the
          content for this page was <em>fetched</em> from.
          <br />
          <br />
          When the server needs to receive data from the database, these fetches
          can take very <em>long</em> times.
          <br />
          <br />
          Feel free to click the refresh button at the top right, and experience
          the <em>speeds</em> our caching solution provides.
          <br />
          <br />
          Our library allows <em>caching data</em> per page, category, single
          pieces of information, whatever you need!
          <br />
          <br />
          In addition we allow support for mutations including
          <em> create, delete,</em> and <em>update</em> - where only the
          relevant data in the cache is updated, <em>immediately!</em>
        </div>
      </div>
      <br />
      <br />
      {productData ? (
        <ProductDetails productData={productData} />
      ) : (
        <strong>No items found</strong>
      )}
    </div>
  );
};

export default ProductDisplay;
