import '../../styles/home-styles/Navbar.scss';
import { HashLink as Link } from 'react-router-hash-link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import qache from '../../images/qache.png';

const Navbar = () => {
  return (
    <>
      <IconContext.Provider value={{ color: 'white', size: '35px' }}>
        <nav className='navbar-container'>
          <div className='left-nav'>
            <div className='image-container'>
              <Link to='/'>
                <img src={qache} alt='Qache Logo' />
              </Link>
            </div>
            <ul className='nav-list'>
              <li>
                <Link to='/demo-app' className='nav-link'>
                  Demo App
                </Link>
              </li>
              <li>
                <Link to='/docs' className='nav-link'>
                  Docs
                </Link>
              </li>
              <li>
                <Link to='/#team' className='nav-link'>
                  Meet The Team
                </Link>
              </li>
            </ul>
          </div>
          <div className='right-nav'>
            <ul className='nav-list'>
              <li>
                <a
                  className='nav-icons'
                  href='https://github.com/oslabs-beta/Qache'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  className='nav-icons'
                  href='https://linkedin.com/'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
