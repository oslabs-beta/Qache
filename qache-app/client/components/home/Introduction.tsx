import { Link } from 'react-router-dom';
import '../../styles/home-styles/Introduction.scss';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import LineGraph from '../demo-app/LineGraph';
import Team from './Team';

const Introduction = () => {
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
              stroke-width='2'
            ></path>
            <path
              d='M69.69 75.84L134.65 113.34L134.65 188.34L69.69 225.84L4.74 188.34L4.74 113.34zM4.74 413.34L69.69 450.84L69.69 525.84L4.74 563.34L-60.21 525.84L-60.21 450.84zM199.6 75.84L264.56 113.34L264.56 188.34L199.6 225.84L134.65 188.34L134.65 113.34zM264.56 188.34L329.51 225.84L329.51 300.84L264.56 338.34L199.6 300.84L199.6 225.84zM394.46 -36.66L459.42 0.84L459.42 75.84L394.46 113.34L329.51 75.84L329.51 0.84zM394.46 413.34L459.42 450.84L459.42 525.84L394.46 563.34L329.51 525.84L329.51 450.84zM459.42 525.84L524.37 563.34L524.37 638.34L459.42 675.84L394.46 638.34L394.46 563.34zM654.28 413.34L719.23 450.84L719.23 525.84L654.28 563.34L589.32 525.84L589.32 450.84zM784.18 -36.66L849.14 0.84L849.14 75.84L784.18 113.34L719.23 75.84L719.23 0.84zM849.14 300.84L914.09 338.34L914.09 413.34L849.14 450.84L784.18 413.34L784.18 338.34zM979.05 75.84L1044 113.34L1044 188.34L979.05 225.84L914.09 188.34L914.09 113.34zM914.09 413.34L979.05 450.84L979.05 525.84L914.09 563.34L849.14 525.84L849.14 450.84zM1108.95 75.84L1173.91 113.34L1173.91 188.34L1108.95 225.84L1044 188.34L1044 113.34zM1238.86 525.84L1303.81 563.34L1303.81 638.34L1238.86 675.84L1173.91 638.34L1173.91 563.34zM1303.82 413.34L1368.77 450.84L1368.77 525.84L1303.82 563.34L1238.86 525.84L1238.86 450.84zM1433.72 -36.66L1498.68 0.84L1498.68 75.84L1433.72 113.34L1368.77 75.84L1368.77 0.84zM1433.72 188.34L1498.68 225.84L1498.68 300.84L1433.72 338.34L1368.77 300.84L1368.77 225.84zM1498.68 300.84L1563.63 338.34L1563.63 413.34L1498.68 450.84L1433.72 413.34L1433.72 338.34z'
              stroke='url(#SvgjsLinearGradient1019)'
              stroke-width='2'
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
              <stop stop-color='#0e2a47' offset='0'></stop>
              <stop stop-color='rgba(3, 255, 246, 1)' offset='1'></stop>
            </linearGradient>
            <linearGradient
              x1='0'
              y1='280'
              x2='1440'
              y2='280'
              gradientUnits='userSpaceOnUse'
              id='SvgjsLinearGradient1019'
            >
              <stop stop-color='rgba(0, 156, 151, 1)' offset='0'></stop>
              <stop stop-color='rgba(3, 255, 246, 1)' offset='1'></stop>
            </linearGradient>
          </defs>
        </svg>
        <div className='overview-texts'>
          <h3>Qache Your Data</h3>
          <p>
            Qache is a modular utility class for handling server side caching of
            Data. Optimize your data fetching performance with our caching
            solution!
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

          {/* navigate to demo-app gif */}
          <div className='demo-container'>
            gif
            <div className='text'>
              <h3>Demo App Preview</h3>
              <p>test</p>
            </div>
          </div>
          <br />
          <br />
          {/* experience our caching tool when browsing through products, rooms, and deals */}
          <div className='demo-container'>
            gif
            <div className='text'>
              <h3>Browse through our Demo App</h3>
              <p>test</p>
            </div>
          </div>
          <br />
          <br />
          {/* describe what one of the page shows, scroll down to look at the products, and say that the first point of the graph represents the latency of fetching those product data */}
          <div className='demo-container'>
            gif
            <div className='text'>
              <h3>Latency Graph</h3>
              <p>test</p>
            </div>
          </div>
          <br />
          <br />
          {/* click on the refresh button to show the line graph changes and describe what it means */}
          <div className='demo-container'>
            gif
            <div className='text'>
              <h3>Qache Tool</h3>
              <p>test</p>
            </div>
          </div>
        </div>
      </section>
      <Team id='team' />
    </>
  );
};

export default Introduction;
