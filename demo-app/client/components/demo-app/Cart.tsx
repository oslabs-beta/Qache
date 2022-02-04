import {useState, useEffect} from 'react';
import {Product, Metric} from '../../../interfaces';
import ProductDetails from './ProductDetails'
import axios, { AxiosResponse } from 'axios';
import '../../styles/demo-styles/CartDisplay.scss'
import LineGraph from './LineGraph';

const Cart = ({props}: {props: any}) => {
    const [cartStorage, setCartStorage] = useState<Product[]>([]);
    const [speed, setSpeed] = useState<number[]>([]);
    const {
        category,
        setMetrics,
        metrics,
        refresh,
        id
      }: {
        category: string;
        setMetrics: React.Dispatch<React.SetStateAction<Metric>>;
        metrics: Metric;
        refresh: boolean;
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
        id: string;
      } = props;
    let body = {
        query: `{
            filterProductsBy(filter: {
              inCart: true
            }) {
              name
              description
              imageUrl
              quantity
              price
              onSale
            }
          }`
    }
    useEffect(() => {
        // if new product added to the cart, that product's id gets passed into Cart through props
        // check cache for that id's product, and add that product to cartStorage in state
        const t1= Date.now();
        axios
          .post<Product[]>('http://localhost:3000/graphql', body)
          .then(({data}: AxiosResponse<any>) => {
            const t2 = Date.now();
            console.log("here")
            setSpeed([...speed, t2 - t1]);
            setCartStorage(data.data.filterProductsBy)
          })
          .catch((err) => {throw {error: err}})
    }, [id, refresh]);

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
        <>
          <div className='cart-display'>
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
        <p>Current items in your cart</p>
        <ProductDetails productData={cartStorage}/>
                <p>Current total cost of your cart:</p>
      </div>
    </>
    )
}

export default Cart;