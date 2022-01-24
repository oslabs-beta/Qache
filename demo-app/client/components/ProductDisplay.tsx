import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { Product } from '../../interfaces';

const ProductDisplay = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  // graphql query
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

  // const setDisplay = (data) => {
  //   console.log('set display', data)
  // };

  useEffect(() => {
    const t1 = Date.now(); // time before axios post starts
    axios.post<Product[]>('http://localhost:3000/graphql', body)
      .then(({ data }: AxiosResponse<any>) => {
        const t2 = Date.now();
        console.log(data.data.getProductsBy);
        setProductData(data.data.getProductsBy);
        console.log(t2 - t1, 'ms'); // time after axios post finished
      })
  }, []);

  console.log('product state: ', productData);
  

  return (
    <>
      <h1>Bedroom</h1>
    </>
  );
};

export default ProductDisplay;
