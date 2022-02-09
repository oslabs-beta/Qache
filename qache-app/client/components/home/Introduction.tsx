import { Link } from 'react-router-dom';
import '../../styles/home-styles/Introduction.scss';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import LineGraph from '../demo-app/LineGraph';
import Team from './Team';
import preview from '../../images/preview.gif';
import demo from '../../images/demo.gif';
import navigate from '../../images/navigate.gif';
import qache from '../../images/qache.gif';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Introduction = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true,
  });
  const [ref3, inView3] = useInView({
    triggerOnce: true,
  });
  const [ref4, inView4] = useInView({
    triggerOnce: true,
  });

  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNode(document.getElementsByClassName('copy-button')[0]);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand('copy');
    console.log('Copied to clipboard: ', range.toString());
    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <header className='introduction-container'>
        <div className='header-texts'>
          <h1>
            <strong>Qache</strong>
          </h1>
          <p>A modular caching solution for your database</p>
          <div className='buttons-container'>
            <div
              className='copy-button hvr-curl-top-right'
              onClick={copyToClipboard}
            >
              <code>
                <MdOutlineArrowForwardIos
                  className='forward-arrow'
                  color='black'
                />
                npm i qache
              </code>
            </div>
            <div className='blue-button'>
              <Link to='/docs'>Get Started</Link>
            </div>
          </div>
        </div>
      </header>

      <div className='version-banner'>
        <p>
          <a
            href='https://www.npmjs.com/package/qache'
            target='_blank'
            rel='noopener noreferrer'
          >
            Qache 1.0.1
          </a>{' '}
          is now available.
        </p>
      </div>

      <div className='overview-container'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          width='1440'
          height='475'
          preserveAspectRatio='none'
          viewBox='0 0 1440 560'
          className='bg'
        >
          <g mask='url("#SvgjsMask1017")' fill='none'>
            <path
              d='M158.96 353.3L234.3 396.8L234.3 483.8L158.96 527.3L83.61 483.8L83.61 396.8zM234.3 -38.2L309.65 5.3L309.65 92.3L234.3 135.8L158.96 92.3L158.96 5.3zM309.65 92.3L385 135.8L385 222.8L309.65 266.3L234.3 222.8L234.3 135.8zM385 -38.2L460.34 5.3L460.34 92.3L385 135.8L309.65 92.3L309.65 5.3zM460.34 353.3L535.69 396.8L535.69 483.8L460.34 527.3L385 483.8L385 396.8zM385 483.8L460.34 527.3L460.34 614.3L385 657.8L309.65 614.3L309.65 527.3zM535.69 222.8L611.03 266.3L611.03 353.3L535.69 396.8L460.34 353.3L460.34 266.3zM535.69 483.8L611.03 527.3L611.03 614.3L535.69 657.8L460.34 614.3L460.34 527.3zM761.73 353.3L837.07 396.8L837.07 483.8L761.73 527.3L686.38 483.8L686.38 396.8zM837.07 -38.2L912.42 5.3L912.42 92.3L837.07 135.8L761.73 92.3L761.73 5.3zM1063.11 92.3L1138.46 135.8L1138.46 222.8L1063.11 266.3L987.77 222.8L987.77 135.8zM1213.81 92.3L1289.15 135.8L1289.15 222.8L1213.81 266.3L1138.46 222.8L1138.46 135.8zM1213.81 353.3L1289.15 396.8L1289.15 483.8L1213.81 527.3L1138.46 483.8L1138.46 396.8zM1289.15 222.8L1364.5 266.3L1364.5 353.3L1289.15 396.8L1213.81 353.3L1213.81 266.3zM1439.84 -38.2L1515.19 5.3L1515.19 92.3L1439.84 135.8L1364.5 92.3L1364.5 5.3zM1439.84 483.8L1515.19 527.3L1515.19 614.3L1439.84 657.8L1364.5 614.3L1364.5 527.3z'
              stroke='url(#SvgjsLinearGradient1018)'
              strokeWidth='2'
            ></path>
            <path
              d='M69.69 75.84L134.65 113.34L134.65 188.34L69.69 225.84L4.74 188.34L4.74 113.34zM4.74 413.34L69.69 450.84L69.69 525.84L4.74 563.34L-60.21 525.84L-60.21 450.84zM199.6 75.84L264.56 113.34L264.56 188.34L199.6 225.84L134.65 188.34L134.65 113.34zM264.56 188.34L329.51 225.84L329.51 300.84L264.56 338.34L199.6 300.84L199.6 225.84zM394.46 -36.66L459.42 0.84L459.42 75.84L394.46 113.34L329.51 75.84L329.51 0.84zM394.46 413.34L459.42 450.84L459.42 525.84L394.46 563.34L329.51 525.84L329.51 450.84zM459.42 525.84L524.37 563.34L524.37 638.34L459.42 675.84L394.46 638.34L394.46 563.34zM654.28 413.34L719.23 450.84L719.23 525.84L654.28 563.34L589.32 525.84L589.32 450.84zM784.18 -36.66L849.14 0.84L849.14 75.84L784.18 113.34L719.23 75.84L719.23 0.84zM849.14 300.84L914.09 338.34L914.09 413.34L849.14 450.84L784.18 413.34L784.18 338.34zM979.05 75.84L1044 113.34L1044 188.34L979.05 225.84L914.09 188.34L914.09 113.34zM914.09 413.34L979.05 450.84L979.05 525.84L914.09 563.34L849.14 525.84L849.14 450.84zM1108.95 75.84L1173.91 113.34L1173.91 188.34L1108.95 225.84L1044 188.34L1044 113.34zM1238.86 525.84L1303.81 563.34L1303.81 638.34L1238.86 675.84L1173.91 638.34L1173.91 563.34zM1303.82 413.34L1368.77 450.84L1368.77 525.84L1303.82 563.34L1238.86 525.84L1238.86 450.84zM1433.72 -36.66L1498.68 0.84L1498.68 75.84L1433.72 113.34L1368.77 75.84L1368.77 0.84zM1433.72 188.34L1498.68 225.84L1498.68 300.84L1433.72 338.34L1368.77 300.84L1368.77 225.84zM1498.68 300.84L1563.63 338.34L1563.63 413.34L1498.68 450.84L1433.72 413.34L1433.72 338.34z'
              stroke='url(#SvgjsLinearGradient1019)'
              strokeWidth='2'
            ></path>
          </g>
          <defs>
            <mask id='SvgjsMask1017'>
              <rect width='1440' height='560' fill='#ffffff'></rect>
            </mask>
            <linearGradient
              x1='220.03199999999998'
              y1='-220.02399999999997'
              x2='1219.9679999999998'
              y2='780.024'
              gradientUnits='userSpaceOnUse'
              id='SvgjsLinearGradient1018'
            >
              <stop stopColor='#0e2a47' offset='0'></stop>
              <stop stopColor='rgba(3, 255, 246, 1)' offset='1'></stop>
            </linearGradient>
            <linearGradient
              x1='0'
              y1='280'
              x2='1440'
              y2='280'
              gradientUnits='userSpaceOnUse'
              id='SvgjsLinearGradient1019'
            >
              <stop stopColor='rgba(0, 156, 151, 1)' offset='0'></stop>
              <stop stopColor='rgba(3, 255, 246, 1)' offset='1'></stop>
            </linearGradient>
          </defs>
        </svg>
        <div className='overview-texts'>
          <h3>Qache Your Data</h3>
          <p>
            Qache is a modular utility class for handling server side caching of
            data. It works with any database and API architecture including
            GraphQL and RESTful APIs.
          </p>
        </div>
        <div className='overview-graph'>
          <LineGraph
            metrics={{
              labels: ['1', '2', '3', '4', '5', '6'],
              data: [178, 13, 33, 25, 14, 20],
            }}
            width={900}
            height={400}
          />
        </div>
      </div>

      <section className='features-container'>
        <div className='demo-feature-container'>
          <h1>Demo our Qache Tool</h1>
          <div className='demo-container' ref={ref1}>
            <motion.img
              src={preview}
              alt='Preview gif'
              initial={{ x: '-100vw' }}
              animate={inView1 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className='text'
              initial={{ x: '100vw' }}
              animate={inView1 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            >
              <h3>Preview</h3>
              <p>
                We built a Demo application to see in real time how our caching
                solution would work on a mock database we created with MongoDB
                and GraphQL. Behind the scenes, we've implemented our Qache
                methods to handle query performance, optimizing it with server
                side caching.
              </p>
            </motion.div>
          </div>
          <br />
          <hr />
          <br />
          <div className='demo-container' ref={ref2}>
            <motion.img
              src={demo}
              alt='Demo gif'
              initial={{ x: '-100vw' }}
              animate={inView2 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className='text'
              initial={{ x: '100vw' }}
              animate={inView2 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            >
              <h3>Browsing Through</h3>
              <p>
                In our Demo application, you can browse through the navigation
                bar and sidebar, allowing you to go through our products, rooms,
                and deals.
              </p>
            </motion.div>
          </div>
          <br />
          <hr />
          <br />
          <div className='demo-container' ref={ref3}>
            <motion.img
              src={navigate}
              alt='Navigate gif'
              initial={{ x: '-100vw' }}
              animate={inView3 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className='text'
              initial={{ x: '100vw' }}
              animate={inView3 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            >
              <h3>Latency Graph</h3>
              <p>
                Our Demo application shows a line graph for each of the pages.
                The landing page has an example line graph of what will be shown
                when you visit any of the pages. The line graph shows the speed
                in miliseconds on the y-axis and the number of fetches/queries
                to the database and our server side cache on the x-axis.
              </p>
            </motion.div>
          </div>
          <br />
          <hr />
          <br />
          <div className='demo-container' ref={ref4}>
            <motion.img
              src={qache}
              alt='Qache gif'
              initial={{ x: '-100vw' }}
              animate={inView4 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className='text'
              initial={{ x: '100vw' }}
              animate={inView4 ? { x: 0 } : 'hidden'}
              transition={{ duration: 1.5 }}
            >
              <h3>Qache Tool</h3>
              <p>
                The first point on the line graph describes how fast our query
                takes to fetch the data from the database and returning it back
                to the client which displays all the products on the page.
                Behind the scenes, our qache tool stashes that response data
                into the cache. Above the graph is a refresh button that allows
                you to refetch the data. It creates a new data point in the line
                graph every time you click on it, but instead of fetching the
                data from the database again, it checks if the data lies in the
                server side cache first, and if it is, it will return the data
                from the cache, cutting the time needed to go to the database.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Team />
    </>
  );
};

export default Introduction;
