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
  const [productMenu, setProductMenu] = useState(false);
  const [roomMenu, setRoomMenu] = useState(false);

  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);

  const showSubMenu = (title: String) => {
    if (title === 'Products') setProductMenu(true);
    if (title === 'Rooms') setRoomMenu(true);
  };

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <nav id='nav-container'>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <Link to='/'>Demo App</Link>
            <a
              onClick={() => {
                showSidebar();
                showSubMenu('Products');
              }}
            >
              Products
            </a>
            <a
              onClick={() => {
                showSidebar();
                showSubMenu('Rooms');
              }}
            >
              Rooms
            </a>
            <a onClick={showSidebar}>Deals</a>
            {/* change deals to link to deals page */}
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
              <li className='navbar-toggle' onClick={hideSidebar}>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <SubMenu
                    item={item}
                    key={'item' + index}
                    sidebar={sidebar}
                    productMenu={productMenu}
                    setProductMenu={setProductMenu}
                    roomMenu={roomMenu}
                    setRoomMenu={setRoomMenu}
                  />
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
