import { Link } from 'react-router-dom';
import '../../styles/home-styles/Introduction.scss';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import LineGraph from '../demo-app/LineGraph';

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
              <MdOutlineArrowForwardIos
                className='forward-arrow'
                color='black'
              />
              <code>npm i qache</code>
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
        <div className='overview-texts'>
          <h2>Qache Your Data</h2>
          <p>Qache is a utility class for handling server-side caching of SQL and noSQL databases to reduce the latency of your queries.</p>
          <p>178ms -{'>'} 13ms</p>
        </div>
        <div className='overview-graph'>
          <LineGraph metrics={{
            labels: ['1', '2', '3', '4', '5', '6'],
            data: [178, 13, 33, 25, 14, 20],
          }}
          width={500}
          height={400}/>
        </div>
      </div>
    </>
  );
};

export default Introduction;
