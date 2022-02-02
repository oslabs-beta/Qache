import { Link } from 'react-router-dom';
import '../../styles/home-styles/Introduction.scss';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

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
          <h2>A modular caching solution for your database</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            turpis nec tincidunt tempus. Etiam feugiat, arcu eu volutpat
            facilisis.
          </p>
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
    </>
  );
};

export default Introduction;
