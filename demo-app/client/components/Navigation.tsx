import { useState } from 'react';
import '../styles/Navigation.scss';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import SubMenu from './SubMenuData';

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <nav id='nav-container'>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <Link to='/'>Demo App</Link>
            <a onClick={showSidebar}>Products</a>
            <a onClick={showSidebar}>Rooms</a>
            <a onClick={showSidebar}>Deals</a>

            <FaIcons.FaSearch className='search' />
            <input
              id='search'
              name='search'
              type='text'
              placeholder='What are you looking for?'
            />
          </div>

          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle' onClick={showSidebar}>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <SubMenu item={item} key={'item' + index} sidebar={sidebar} />
                );
              })}
            </ul>
          </nav>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navigation;
