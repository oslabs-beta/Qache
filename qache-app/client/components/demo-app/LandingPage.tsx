import '../../styles/demo-styles/LandingPage.scss';
import LineGraph from './LineGraph';
import storage from '../../images/storage.jpg';

const LandingPage = () => {
  return (
    <>
      <div className='landingPage-container'>
        <div className='section-container'>
          <div className='imageContainer'>
            <img src={storage} alt='Storage picture' />
            <div className='img-caption'>
              <h2>Find the right products for your dream room using our demo!</h2>
            </div>
          </div>

          <div className='graph-container'>
            <h2>
              Experience our caching solution<br/> when searching for products!
            </h2>
            <LineGraph
              metrics={{
                labels: ['1', '2', '3', '4', '5', '6'],
                data: [225, 20, 33, 25, 14, 20],
              }}
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
