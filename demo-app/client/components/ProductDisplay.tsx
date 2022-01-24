import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { Product } from '../../interfaces';

const ProductDisplay = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  const body = {
    query: `{getProductsBy(category: "Bedroom") {
      name
      description
      imageUrl
      quantity
      price
      onSale
      category
    }}`
  };

  useEffect(() => {
    const t1: number = Date.now(); // time before axios post starts
    axios.post<Product[]>('http://localhost:3000/graphql', body)
      .then(({ data }: AxiosResponse<any>) => {
        const t2: number = Date.now();
        console.log('Query response: ', data.data.getProductsBy); // array of products
        setProductData(data.data.getProductsBy);
        console.log(t2 - t1, 'ms'); // time after axios post finished
      })
  }, []);

  console.log('Product state: ', productData);
  
  return (
    <>
      <h1>Bedroom</h1>
    </>
  );
};

export default ProductDisplay;
