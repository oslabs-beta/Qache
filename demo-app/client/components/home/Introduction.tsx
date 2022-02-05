import Team from "./Team"

const Introduction = () => {
  return (
    <>
      <header className='introduction-container'>
        <Team/>
        <div className='left-stack'>
          <div>
            <h1>A server side caching libary for your database</h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod turpis nec tincidunt tempus. Etiam feugiat, arcu eu
              volutpat facilisis.
            </p>
          </div>
          <div className='buttons-container'>
            <div className='copy-button'>
              <a>{'>'} npm i qache</a>
            </div>
            <div className='blue-button'>
              <a>Get Started</a>
            </div>
          </div>
          <div className='right-stack'>
            <h1>Qache 1.0.1</h1>
          </div>
        </div>
      </header>
    </>
  );
};

export default Introduction;
